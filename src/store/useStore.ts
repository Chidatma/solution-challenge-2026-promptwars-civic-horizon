import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  xp: number;
  badges: string[];
  progress: Record<string, number>;
  addXP: (amount: number) => void;
  addBadge: (badge: string) => void;
  updateProgress: (key: string, value: number) => void;
  resetStore: () => void;
  setInitialData: (data: { xp: number; badges: string[]; progress: Record<string, number> }) => void;
}

export const useStore = create<UserState>()(
  persist(
    (set) => ({
      xp: 0,
      badges: [],
      progress: {},
      addXP: (amount) => set((state) => ({ xp: state.xp + amount })),
      addBadge: (badge) =>
        set((state) => ({
          badges: state.badges.includes(badge)
            ? state.badges
            : [...state.badges, badge],
        })),
      updateProgress: (key, value) =>
        set((state) => ({
          progress: { ...state.progress, [key]: value },
        })),
      resetStore: () => set({ xp: 0, badges: [], progress: {} }),
      setInitialData: (data) => set(data),
    }),
    {
      name: "civic-horizon-storage",
    }
  )
);
