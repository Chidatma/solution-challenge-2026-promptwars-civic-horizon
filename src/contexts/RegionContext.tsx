import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export type Region = 'IN' | 'US';

interface RegionInfo {
  id: Region;
  name: string;
  flag: string;
  currency: string;
  majorParties: string[];
}

export const REGIONS: Record<Region, RegionInfo> = {
  IN: {
    id: 'IN',
    name: 'India',
    flag: '🇮🇳',
    currency: 'INR',
    majorParties: ['BJP', 'INC', 'AAP', 'CPI(M)']
  },
  US: {
    id: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    majorParties: ['Democratic', 'Republican', 'Libertarian', 'Green']
  }
};

interface RegionContextType {
  region: Region;
  setRegion: (region: Region) => void;
  regionInfo: RegionInfo;
  isFirstVisit: boolean;
  completeSelection: () => void;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export const RegionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [region, setRegionState] = useState<Region>(() => {
    const saved = localStorage.getItem('app-region');
    return (saved as Region) || 'IN';
  });

  const [isFirstVisit, setIsFirstVisit] = useState(() => {
    return !localStorage.getItem('app-region-selected');
  });

  const setRegion = useCallback((reg: Region) => {
    setRegionState(reg);
    localStorage.setItem('app-region', reg);
  }, []);

  const completeSelection = useCallback(() => {
    localStorage.setItem('app-region-selected', 'true');
    setIsFirstVisit(false);
  }, []);

  const value = {
    region,
    setRegion,
    regionInfo: REGIONS[region],
    isFirstVisit,
    completeSelection
  };

  return (
    <RegionContext.Provider value={value}>
      {children}
    </RegionContext.Provider>
  );
};

export const useRegion = () => {
  const context = useContext(RegionContext);
  if (context === undefined) {
    throw new Error('useRegion must be used within a RegionProvider');
  }
  return context;
};
