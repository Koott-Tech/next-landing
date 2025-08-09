'use client';

import React, { createContext, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import LoadingScreen from './LoadingScreen';

export const LoadingContext = createContext({ startLoading: () => {} });

const LoadingProvider = ({ children }) => {
  const pathname = usePathname();
  const previousPathRef = useRef(undefined);
  const [isLoading, setIsLoading] = useState(true); // show on first load
  const [loadingKey, setLoadingKey] = useState(0);

  useEffect(() => {
    // Trigger loading on route change (including first mount)
    if (previousPathRef.current === undefined || previousPathRef.current !== pathname) {
      setIsLoading(true);
      setLoadingKey((k) => k + 1); // remount LoadingScreen to restart its animation
      previousPathRef.current = pathname;
    }
  }, [pathname]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const startLoading = () => {
    setIsLoading(true);
    setLoadingKey((k) => k + 1);
  };

  const contextValue = useMemo(() => ({ startLoading }), []);

  return (
    <LoadingContext.Provider value={contextValue}>
      {isLoading && (
        <LoadingScreen key={loadingKey} onLoadingComplete={handleLoadingComplete} />
      )}
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;