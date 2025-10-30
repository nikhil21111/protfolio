"use client";

import { useRef, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { motion, AnimatePresence } from "framer-motion";
import { AppData } from "@/lib/apps";
import AppContent from "./apps/AppContent";

interface WindowProps {
  app: AppData;
  isActive: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  zIndex: number;
  userName: string;
}

export default function Window({
  app,
  isActive,
  isMinimized,
  onClose,
  onMinimize,
  onFocus,
  zIndex,
  userName,
}: WindowProps) {
  const nodeRef = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);
  
  // Position MiniMarket in top-right, others cascade from top-left
  const getDefaultPosition = () => {
    if (typeof window === "undefined") return { x: 50, y: 50 };
    return app.id === "minimarket" 
      ? { x: window.innerWidth - 500, y: 50 }
      : { x: 50 + zIndex * 20, y: 50 + zIndex * 20 };
  };
  
  const [position, setPosition] = useState(getDefaultPosition());

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  if (isMinimized) return null;

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".window-header"
      position={isMaximized ? { x: 0, y: 0 } : position}
      onStop={(e, data) => {
        if (!isMaximized) {
          setPosition({ x: data.x, y: data.y });
        }
      }}
      disabled={isMaximized}
    >
      <motion.div
        ref={nodeRef}
        initial={{ scale: 0.8, opacity: 0, y: -50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 25,
          duration: 0.3 
        }}
        className={`absolute ${isMaximized ? "inset-0" : ""}`}
        style={{
          zIndex,
          width: isMaximized ? "100%" : app.width || "600px",
          height: isMaximized ? "calc(100vh - 48px)" : app.height || "500px",
          filter: isActive ? "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" : "drop-shadow(0 10px 20px rgba(0,0,0,0.3))",
        }}
        onClick={onFocus}
      >
        <div className={`flex flex-col h-full win95-border bg-win95-gray ${isActive ? "" : "opacity-95"} overflow-hidden`}>
          {/* Title Bar - Fixed at top */}
          <div
            className={`window-header flex items-center justify-between px-2 py-1 cursor-move transition-all duration-200 flex-shrink-0 ${
              isActive 
                ? "bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700" 
                : "bg-gradient-to-r from-gray-700 to-gray-600"
            }`}
          >
            <div className="flex items-center space-x-2">
              {app.icon.startsWith('/') ? (
                <img 
                  src={app.icon} 
                  alt={app.name}
                  width={20}
                  height={20}
                  className="pixelated animate-pulse"
                  style={{ imageRendering: 'pixelated', animationDuration: '3s' }}
                />
              ) : (
                <span className="text-xl">{app.icon}</span>
              )}
              <span className="text-white font-bold text-sm pixel-font tracking-wider">{app.name}</span>
            </div>
            <div className="flex space-x-1">
              {/* Minimize Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMinimize();
                }}
                className="win95-button w-7 h-6 flex items-center justify-center text-base font-bold hover:bg-win95-lightGray transition-all hover:scale-105 active:scale-95"
                aria-label="Minimize"
              >
                <span className="relative bottom-1">_</span>
              </button>
              {/* Maximize Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMaximize();
                }}
                className="win95-button w-7 h-6 flex items-center justify-center text-sm font-bold hover:bg-win95-lightGray transition-all hover:scale-105 active:scale-95"
                aria-label="Maximize"
              >
                □
              </button>
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="win95-button w-7 h-6 flex items-center justify-center text-sm font-bold hover:bg-red-600 hover:text-white transition-all hover:scale-105 active:scale-95"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Menu Bar - Optional - Fixed below title bar */}
          <div className="win95-border-inset bg-win95-gray px-1 py-0.5 text-xs flex space-x-2 flex-shrink-0">
            <button className="hover:bg-blue-800 hover:text-white px-2 py-0.5 cursor-pointer transition-colors">File</button>
            <button className="hover:bg-blue-800 hover:text-white px-2 py-0.5 cursor-pointer transition-colors">Edit</button>
            <button className="hover:bg-blue-800 hover:text-white px-2 py-0.5 cursor-pointer transition-colors">View</button>
            <button className="hover:bg-blue-800 hover:text-white px-2 py-0.5 cursor-pointer transition-colors">Help</button>
          </div>

          {/* Window Content - Scrollable area */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden bg-white relative">
            <AppContent appId={app.id} userName={userName} />
          </div>

          {/* Status Bar - Fixed at bottom */}
          <div className="win95-border-inset px-2 py-1 bg-win95-gray flex items-center justify-between text-xs flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="win95-border-inset px-2 py-0.5 bg-gray-200">
                <span className="font-mono">Ready</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 win95-border-inset bg-green-400"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </Draggable>
  );
}
