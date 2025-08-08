'use client';

import React from 'react';
import Image from 'next/image';

const ChatMessage = ({ message, doctor }) => {
  const isDoctor = message.sender === 'doctor';
  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessageContent = () => {
    switch (message.type) {
      case 'text':
        return (
          <div className="text-gray-800 whitespace-pre-wrap">
            {message.text}
          </div>
        );
      
      case 'image':
        return (
          <div className="max-w-xs">
            <Image
              src={URL.createObjectURL(message.file)}
              alt="Shared image"
              width={320}
              height={240}
              className="rounded-lg max-w-full h-auto"
            />
          </div>
        );
      
      case 'file':
        return (
          <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg max-w-xs">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {message.fileName}
              </p>
              <p className="text-xs text-gray-500">
                {(message.fileSize / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        );
      
      case 'voice':
        return (
          <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg max-w-xs">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-700">{message.duration}</span>
            </div>
          </div>
        );
      
      case 'sticker':
        return (
          <div className="text-4xl">
            {message.sticker}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`flex ${isDoctor ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-xs lg:max-w-md ${isDoctor ? 'order-1' : 'order-2'}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isDoctor
              ? 'bg-white border border-gray-200 shadow-sm'
              : 'bg-blue-500 text-white'
          }`}
        >
          {renderMessageContent()}
        </div>
        <div className={`mt-1 text-xs text-gray-500 ${isDoctor ? 'text-left' : 'text-right'}`}>
          {formatTime(message.timestamp)}
        </div>
      </div>
      
      {isDoctor && (
        <div className="order-2 ml-3">
          <Image
            src={doctor.image}
            alt={doctor.name}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default ChatMessage; 