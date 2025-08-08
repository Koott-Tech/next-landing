'use client';

import React from "react";
import Image from 'next/image';
import { ArrowUp, Paperclip, Square, X, StopCircle, Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Utility function for className merging
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Embedded CSS for minimal custom styles
const styles = `
  *:focus-visible {
    outline-offset: 0 !important;
    --ring-offset: 0 !important;
  }
  textarea::-webkit-scrollbar {
    width: 6px;
  }
  textarea::-webkit-scrollbar-track {
    background: transparent;
  }
  textarea::-webkit-scrollbar-thumb {
    background-color: #444444;
    border-radius: 3px;
  }
  textarea::-webkit-scrollbar-thumb:hover {
    background-color: #555555;
  }
`;

// Inject styles into document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

// Textarea Component
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  const textareaRef = React.useRef(null);
  const combinedRef = React.useMemo(() => {
    if (ref) {
      if (typeof ref === 'function') {
        return (node) => {
          textareaRef.current = node;
          ref(node);
        };
      } else {
        ref.current = textareaRef.current;
        return textareaRef;
      }
    }
    return textareaRef;
  }, [ref]);

  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

         const adjustHeight = () => {
       textarea.style.height = 'auto';
       const scrollHeight = textarea.scrollHeight;
       const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
       const maxHeight = lineHeight * 8; // 8 lines maximum
       
       textarea.style.height = Math.min(scrollHeight, maxHeight) + 'px';
       
       // Enable scrolling if content exceeds max height
       if (scrollHeight > maxHeight) {
         textarea.style.overflowY = 'auto';
       } else {
         textarea.style.overflowY = 'hidden';
       }
     };

    // Adjust height on input
    textarea.addEventListener('input', adjustHeight);
    
    // Initial adjustment
    adjustHeight();

    return () => {
      textarea.removeEventListener('input', adjustHeight);
    };
  }, []);

  return (
    <textarea
      className={cn(
        "flex w-full rounded-md border-none bg-transparent px-3 py-2.5 text-base text-gray-100 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px] resize-none scrollbar-thin scrollbar-thumb-[#444444] scrollbar-track-transparent hover:scrollbar-thumb-[#555555] transition-height duration-200",
        className
      )}
      ref={combinedRef}
      rows={1}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

// Button Component
const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variantClasses = {
    default: "bg-white hover:bg-white/80 text-black",
    outline: "border border-[#444444] bg-transparent hover:bg-[#3A3A40]",
    ghost: "bg-transparent hover:bg-[#3A3A40]",
  };
  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 text-sm",
    lg: "h-12 px-6",
    icon: "h-8 w-8 rounded-full aspect-[1/1]",
  };
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

// VoiceRecorder Component
const VoiceRecorder = ({
  isRecording,
  onStartRecording,
  onStopRecording,
  visualizerBars = 32,
}) => {
  const [time, setTime] = React.useState(0);
  const timerRef = React.useRef(null);

  React.useEffect(() => {
    if (isRecording) {
      onStartRecording();
      timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      onStopRecording(time);
      setTime(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording, time, onStartRecording, onStopRecording]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full transition-all duration-300 py-3",
        isRecording ? "opacity-100" : "opacity-0 h-0"
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
        <span className="font-mono text-sm text-white/80">{formatTime(time)}</span>
      </div>
      <div className="w-full h-10 flex items-center justify-center gap-0.5 px-4">
        {[...Array(visualizerBars)].map((_, i) => (
          <div
            key={i}
            className="w-0.5 rounded-full bg-white/50 animate-pulse"
            style={{
              height: `${Math.max(15, Math.random() * 100)}%`,
              animationDelay: `${i * 0.05}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};



// Main PromptInputBox Component
export const PromptInputBox = React.forwardRef((props, ref) => {
  const { onSend = () => {}, isLoading = false, placeholder = "Type your message here...", className } = props;
  const [input, setInput] = React.useState("");
  const [files, setFiles] = React.useState([]);
  const [filePreviews, setFilePreviews] = React.useState({});
  const [isRecording, setIsRecording] = React.useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const uploadInputRef = React.useRef(null);
  const promptBoxRef = React.useRef(null);
  const emojiPickerRef = React.useRef(null);

  const isImageFile = (file) => file.type.startsWith("image/");

  const processFile = (file) => {
    if (!isImageFile(file)) {
      console.log("Only image files are allowed");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      console.log("File too large (max 10MB)");
      return;
    }
    setFiles([file]);
    const reader = new FileReader();
    reader.onload = (e) => setFilePreviews({ [file.name]: e.target?.result });
    reader.readAsDataURL(file);
  };

  const handleDragOver = React.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragLeave = React.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = React.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => isImageFile(file));
    if (imageFiles.length > 0) processFile(imageFiles[0]);
  }, [processFile]);

  const handleRemoveFile = (index) => {
    const fileToRemove = files[index];
    if (fileToRemove && filePreviews[fileToRemove.name]) setFilePreviews({});
    setFiles([]);
  };

  const handlePaste = React.useCallback((e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          e.preventDefault();
          processFile(file);
          break;
        }
      }
    }
  }, [processFile]);

  React.useEffect(() => {
    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [handlePaste]);

  // Close emoji picker when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  const handleSubmit = () => {
    if (input.trim() || files.length > 0) {
      onSend(input, files);
      setInput("");
      setFiles([]);
      setFilePreviews({});
    }
  };

  const handleStartRecording = () => console.log("Started recording");

  const handleStopRecording = (duration) => {
    console.log(`Stopped recording after ${duration} seconds`);
    setIsRecording(false);
    onSend(`[Voice message - ${duration} seconds]`, []);
  };

  const hasContent = input.trim() !== "" || files.length > 0;

  return (
    <div
      className={cn(
        "rounded-3xl border border-[#444444] bg-[#1F2023] p-2 shadow-[0_8px_30px_rgba(0,0,0,0.24)] transition-all duration-300",
        isLoading && "border-red-500/70",
        isRecording && "border-red-500/70",
        className
      )}
      ref={ref || promptBoxRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {files.length > 0 && !isRecording && (
        <div className="flex flex-wrap gap-2 p-0 pb-1 transition-all duration-300">
          {files.map((file, index) => (
            <div key={index} className="relative group">
              {file.type.startsWith("image/") && filePreviews[file.name] && (
                <div
                  className="w-16 h-16 rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
                >
                  <Image
                    src={filePreviews[file.name]}
                    alt={file.name}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile(index);
                    }}
                    className="absolute top-1 right-1 rounded-full bg-black/70 p-0.5 opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3 text-white" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div
        className={cn(
          "transition-all duration-300",
          isRecording ? "h-0 overflow-hidden opacity-0" : "opacity-100"
        )}
      >
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder={placeholder}
          className="text-base"
        />
      </div>

      {isRecording && (
        <VoiceRecorder
          isRecording={isRecording}
          onStartRecording={handleStartRecording}
          onStopRecording={handleStopRecording}
        />
      )}

      <div className="flex items-center justify-between gap-2 p-0 pt-2">
                  <div
            className={cn(
              "flex items-center gap-1 transition-opacity duration-300",
              isRecording ? "opacity-0 invisible h-0" : "opacity-100 visible"
            )}
          >
            <button
              onClick={() => uploadInputRef.current?.click()}
              className="flex h-8 w-8 text-[#9CA3AF] cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-gray-600/30 hover:text-[#D1D5DB]"
              disabled={isRecording}
            >
              <Paperclip className="h-5 w-5 transition-colors" />
              <input
                ref={uploadInputRef}
                type="file"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) processFile(e.target.files[0]);
                  if (e.target) e.target.value = "";
                }}
                accept="image/*"
              />
            </button>

            <div className="relative" ref={emojiPickerRef}>
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="flex h-8 w-8 text-[#9CA3AF] cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-gray-600/30 hover:text-[#D1D5DB]"
                disabled={isRecording}
              >
                <span className="text-lg">😊</span>
              </button>

                             {showEmojiPicker && (
                 <div className="absolute bottom-full left-0 mb-16 p-2 bg-[#2A2B2E] border border-[#444444] rounded-lg shadow-lg max-h-48 overflow-y-auto z-50 w-64">
                   <div className="grid grid-cols-8 gap-1">
                     {['😊', '😂', '🥰', '😍', '😎', '🤔', '😢', '😡', '😴', '🤗', '💪', '❤️', '🙏', '👍', '👎', '🎉', '🔥', '💯', '✨', '🌟', '💖', '😌', '😇', '🤩', '😋', '🤤', '😪', '😵', '🤯', '😱', '😨', '🥺'].map((emoji) => (
                       <button
                         key={emoji}
                         onClick={() => {
                           setInput(prev => prev + emoji);
                           setShowEmojiPicker(false);
                         }}
                         className="w-8 h-8 flex items-center justify-center hover:bg-[#3A3A40] rounded transition-colors text-lg hover:scale-110 active:scale-95"
                       >
                         {emoji}
                       </button>
                     ))}
                   </div>
                 </div>
               )}
            </div>
          </div>

        <Button
          variant="default"
          size="icon"
          className={cn(
            "h-8 w-8 rounded-full transition-all duration-200",
            isRecording
              ? "bg-transparent hover:bg-gray-600/30 text-red-500 hover:text-red-400"
              : hasContent
              ? "bg-white hover:bg-white/80 text-[#1F2023]"
              : "bg-transparent hover:bg-gray-600/30 text-[#9CA3AF] hover:text-[#D1D5DB]"
          )}
          onClick={() => {
            if (isRecording) setIsRecording(false);
            else if (hasContent) handleSubmit();
            else setIsRecording(true);
          }}
          disabled={isLoading && !hasContent}
        >
          {isLoading ? (
            <Square className="h-4 w-4 fill-[#1F2023] animate-pulse" />
          ) : isRecording ? (
            <StopCircle className="h-5 w-5 text-red-500" />
          ) : hasContent ? (
            <ArrowUp className="h-4 w-4 text-[#1F2023]" />
          ) : (
            <Mic className="h-5 w-5 text-[#1F2023] transition-colors" />
          )}
        </Button>
      </div>
    </div>
  );
});
PromptInputBox.displayName = "PromptInputBox"; 