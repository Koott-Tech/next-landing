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

  const getTimeBgColor = () => {
    if (time <= 60) return 'bg-red-100';
    if (time <= 300) return 'bg-yellow-100';
    return 'bg-green-100';
  };

  return (
    <div className={`px-4 py-2 rounded-lg ${getTimeBgColor()} ${getTimeColor()} font-mono font-bold text-lg`}>
      <div className="flex items-center space-x-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{formatTime(time)}</span>
      </div>
    </div>
  );
};

export default Timer; 