'use client';

import React, { useState } from 'react';
import LoadingScreen from './LoadingScreen';

const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      {children}
    </>
  );
};

export default LoadingProvider; 