import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser, signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc, serverTimestamp, getDoc, getDocs, collection } from 'firebase/firestore';
import { auth, db, googleProvider, checkFirestoreConnection, handleFirestoreError, OperationType } from '@/src/lib/firebase';
import { useStore } from '@/src/store/useStore';

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  signIn: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { xp, badges, progress, setInitialData, resetStore } = useStore();
  const isSyncingFromFirebase = useRef(false);

  useEffect(() => {
    checkFirestoreConnection();
    
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setLoading(true); // Re-set loading while we fetch stats

        try {
          const userRef = doc(db, 'users', firebaseUser.uid);
          const userSnap = await getDoc(userRef);
          
          let initialXP = 0;
          let initialBadges: string[] = [];
          let initialProgress: Record<string, number> = {};

          if (userSnap.exists()) {
            const data = userSnap.data();
            initialXP = data.xp || 0;
            
            // Fetch badges
            const badgesSnap = await getDocs(collection(db, 'users', firebaseUser.uid, 'badges'));
            initialBadges = badgesSnap.docs.map(doc => doc.id);

            // Fetch progress
            const progressSnap = await getDocs(collection(db, 'users', firebaseUser.uid, 'progress'));
            progressSnap.docs.forEach(doc => {
              initialProgress[doc.id] = doc.data().value;
            });
          } else {
            // New user initialization
            await setDoc(userRef, {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              xp: 0,
              updatedAt: serverTimestamp()
            });
          }

          isSyncingFromFirebase.current = true;
          setInitialData({ xp: initialXP, badges: initialBadges, progress: initialProgress });
          // Use a timeout or next tick to reset the ref to avoid immediate upload of what we just downloaded
          setTimeout(() => { isSyncingFromFirebase.current = false; }, 100);

        } catch (err) {
          handleFirestoreError(err, OperationType.GET, `users/${firebaseUser.uid}`);
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
        setLoading(false);
        resetStore(); // Clear local state when logged out
      }
    });

    return () => unsubscribe();
  }, [setInitialData, resetStore]);

  // XP Sync to Firebase
  useEffect(() => {
    if (user && !isSyncingFromFirebase.current) {
      const updateXP = async () => {
        try {
          const userRef = doc(db, 'users', user.uid);
          await setDoc(userRef, {
            xp,
            updatedAt: serverTimestamp(),
            displayName: user.displayName,
            email: user.email,
            uid: user.uid
          }, { merge: true });
        } catch (err) {
          console.error("Failed to sync XP:", err);
        }
      };
      updateXP();
    }
  }, [xp, user]);

  // Badges Sync to Firebase
  useEffect(() => {
    if (user && !isSyncingFromFirebase.current && badges.length > 0) {
      const lastBadge = badges[badges.length - 1];
      const syncBadge = async () => {
        try {
          const badgeRef = doc(db, 'users', user.uid, 'badges', lastBadge);
          await setDoc(badgeRef, {
            badgeId: lastBadge,
            earnedAt: serverTimestamp()
          });
        } catch (err) {
          console.error("Failed to sync Badge:", err);
        }
      };
      syncBadge();
    }
  }, [badges, user]);

  // Progress Sync to Firebase
  useEffect(() => {
    if (user && !isSyncingFromFirebase.current && Object.keys(progress).length > 0) {
      const syncProgress = async () => {
        try {
          // We sync all progress that changed. For simplicity, we sync the whole map if any key changes, 
          // but better would be to find the specific change.
          for (const [key, value] of Object.entries(progress)) {
            const progRef = doc(db, 'users', user.uid, 'progress', key);
            await setDoc(progRef, {
              topicId: key,
              value,
              updatedAt: serverTimestamp()
            });
          }
        } catch (err) {
          console.error("Failed to sync Progress:", err);
        }
      };
      syncProgress();
    }
  }, [progress, user]);

  const signIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a FirebaseProvider');
  }
  return context;
};
