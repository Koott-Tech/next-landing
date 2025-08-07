'use client';

import React from 'react';

const Timer = ({ time }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (time <= 60) return 'text-red-600';
    if (time <= 300) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className={`px-4 py-2 ${getTimeColor()} font-mono font-bold text-lg`}>
      <span>{formatTime(time)}</span>
    </div>
  );
};

export default Timer; 