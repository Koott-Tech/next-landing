'use client';

import React, { useState } from 'react';

const TimeWarningModal = ({ onExtendTime, onEndSession }) => {
  const [showExtensionOptions, setShowExtensionOptions] = useState(false);

  const extensionOptions = [
    { minutes: 15, price: 50, label: '15 minutes' },
    { minutes: 30, price: 100, label: '30 minutes' },
    { minutes: 60, price: 200, label: '60 minutes' }
  ];

  const handleExtend = (option) => {
    onExtendTime(option);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Time Almost Up!</h2>
          <p className="text-gray-600">
            Your session will end in 1 minute. Would you like to extend your time?
          </p>
        </div>

        {!showExtensionOptions ? (
          /* Initial Options */
          <div className="p-6 space-y-4">
            <button
              onClick={() => setShowExtensionOptions(true)}
              className="w-full py-4 px-6 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200"
            >
              Yes, Extend Time
            </button>
            <button
              onClick={onEndSession}
              className="w-full py-4 px-6 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200"
            >
              No, End Session
            </button>
          </div>
        ) : (
          /* Extension Options */
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Choose Extension Time
            </h3>
            <div className="space-y-3 mb-6">
              {extensionOptions.map((option) => (
                <button
                  key={option.minutes}
                  onClick={() => handleExtend(option)}
                  className="w-full py-4 px-6 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex justify-between items-center"
                >
                  <span>{option.label}</span>
                  <span>₹{option.price}</span>
                </button>
              ))}
            </div>
            <button
              onClick={onEndSession}
              className="w-full py-3 px-6 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeWarningModal; 