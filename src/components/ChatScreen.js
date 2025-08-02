'use client';

import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import Timer from './Timer';

const ChatScreen = ({ doctor, session, remainingTime, onTimeWarning, onEndSession, onExtendTime }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentTime, setCurrentTime] = useState(remainingTime);
  const warningShownRef = useRef(false);
  
  // Debug: Log initial time
  useEffect(() => {
    console.log('Initial remaining time:', remainingTime);
    console.log('Current time state:', currentTime);
  }, [remainingTime, currentTime]);

  // Reset warning ref when remainingTime changes (new session or extension)
  useEffect(() => {
    warningShownRef.current = false;
  }, [remainingTime]);

  // Update currentTime when remainingTime changes (for time extensions)
  useEffect(() => {
    setCurrentTime(remainingTime);
  }, [remainingTime]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Timer effect
  useEffect(() => {
    if (currentTime <= 0) {
      onEndSession();
      return;
    }

    // Check for time warning at exactly 60 seconds
    if (currentTime === 60 && !warningShownRef.current) {
      console.log('Timer reached 60 seconds, showing warning');
      console.log('Triggering time warning');
      warningShownRef.current = true;
      onTimeWarning();
    }

    const timer = setInterval(() => {
      setCurrentTime(prev => {
        const newTime = prev - 1;
        console.log('Timer tick:', newTime);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentTime, onTimeWarning, onEndSession]);

  // Simulate doctor's initial message
  useEffect(() => {
    setTimeout(() => {
      setMessages([
        {
          id: 1,
          sender: 'doctor',
          text: `Hello! I'm ${doctor.name}. I'm here to support you today. How are you feeling?`,
          timestamp: new Date(),
          type: 'text'
        }
      ]);
    }, 1000);
  }, [doctor.name]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: newMessage,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate doctor typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const doctorResponse = {
        id: Date.now() + 1,
        sender: 'doctor',
        text: "Thank you for sharing that with me. I'm here to listen and help you work through this.",
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, doctorResponse]);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileMessage = {
        id: Date.now(),
        sender: 'user',
        file: file,
        fileName: file.name,
        fileSize: file.size,
        timestamp: new Date(),
        type: file.type.startsWith('image/') ? 'image' : 'file'
      };
      setMessages(prev => [...prev, fileMessage]);
    }
  };

  const handleVoiceMessage = () => {
    // Simulate voice message
    const voiceMessage = {
      id: Date.now(),
      sender: 'user',
      duration: '0:15',
      timestamp: new Date(),
      type: 'voice'
    };
    setMessages(prev => [...prev, voiceMessage]);
  };

  const handleSticker = (sticker) => {
    const stickerMessage = {
      id: Date.now(),
      sender: 'user',
      sticker: sticker,
      timestamp: new Date(),
      type: 'sticker'
    };
    setMessages(prev => [...prev, stickerMessage]);
  };

  const stickers = ['😊', '😢', '😡', '😌', '🤗', '💪', '❤️', '🙏'];

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{doctor.name}</h2>
              <p className="text-sm text-gray-600">{doctor.specialty}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Timer time={currentTime} />
            <button
              onClick={onEndSession}
              className="px-4 py-2 text-red-600 hover:text-red-700 font-medium"
            >
              End Session
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} doctor={doctor} />
        ))}
        
        {isTyping && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-sm">{doctor.name} is typing...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Stickers */}
      <div className="bg-white border-t border-gray-200 p-2">
        <div className="flex space-x-2 overflow-x-auto">
          {stickers.map((sticker, index) => (
            <button
              key={index}
              onClick={() => handleSticker(sticker)}
              className="text-2xl hover:scale-110 transition-transform duration-200 p-2 rounded-lg hover:bg-gray-100"
            >
              {sticker}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          {/* File Upload */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          
          {/* Voice Message */}
          <button
            onClick={handleVoiceMessage}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>

          {/* Text Input */}
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows="1"
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`p-3 rounded-lg transition-colors duration-200 ${
              newMessage.trim()
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileUpload}
          accept="image/*,video/*,.pdf,.doc,.docx"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ChatScreen; 