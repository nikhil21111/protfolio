"use client";

import { apps } from "@/lib/apps";
import Image from "next/image";
import { useState } from "react";
import ShutdownScreen from "./ShutdownScreen";

interface TaskbarProps {
  openWindows: string[];
  minimizedWindows: string[];
  activeWindow: string | null;
  onWindowClick: (appId: string) => void;
  time: Date;
  visitorCount: number;
  musicPlaying: boolean;
  onToggleMusic: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Taskbar({
  openWindows,
  minimizedWindows,
  activeWindow,
  onWindowClick,
  time,
  isDarkMode,
  onToggleDarkMode,
}: TaskbarProps) {
  const [showShutdown, setShowShutdown] = useState(false);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleShutdownComplete = () => {
    // Close the current tab/window
    window.close();
    // If window.close() doesn't work (user opened directly), redirect to a goodbye page
    setTimeout(() => {
      window.location.href = 'about:blank';
    }, 100);
  };

  return (
    <>
      {showShutdown && (
        <ShutdownScreen 
          onComplete={handleShutdownComplete}
          onClose={() => setShowShutdown(false)}
        />
      )}
      
      <div className={`fixed bottom-0 left-0 right-0 h-12 win95-border flex items-center px-2 space-x-2 z-[10000] transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-win95-gray'}`}>
        <button 
          onClick={() => setShowShutdown(true)}
          className={`win95-button h-8 px-3 flex items-center space-x-2 font-bold ${isDarkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-win95-lightGray text-black'}`}
        >
          <span className="text-lg">🪟</span>
          <span className="text-sm">Start</span>
        </button>
      <div className={`h-8 w-px ${isDarkMode ? 'bg-gray-600' : 'bg-gray-400'}`} />
      <div className="flex-1 flex space-x-1 overflow-x-auto">
        {openWindows.map((appId) => {
          const app = apps.find((a) => a.id === appId);
          if (!app) return null;
          const isActive = activeWindow === appId;
          const isMinimized = minimizedWindows.includes(appId);
          return (
            <button key={appId} onClick={() => onWindowClick(appId)} className={`h-8 px-3 flex items-center space-x-2 min-w-[120px] max-w-[200px] ${isActive && !isMinimized ? "win95-border-inset" : "win95-button"}`}>
              {app.icon.startsWith('/') ? (
                <Image 
                  src={app.icon} 
                  alt={app.name}
                  width={16}
                  height={16}
                  className="pixelated"
                  style={{ imageRendering: 'pixelated' }}
                />
              ) : (
                <span>{app.icon}</span>
              )}
              <span className="text-xs truncate">{app.name}</span>
            </button>
          );
        })}
      </div>
      <div className={`flex items-center space-x-2 win95-border-inset px-3 h-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
        <a href="https://github.com/nikhil21111" target="_blank" rel="noopener noreferrer" className={`p-1 rounded transition-all hover:scale-110 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-win95-lightGray'}`} aria-label="GitHub">
          <Image src="/github-pixel-D8TwYHeN.png" alt="GitHub" width={24} height={24} className="pixelated" style={{ imageRendering: 'pixelated' }} unoptimized />
        </a>
        <a href="https://www.linkedin.com/in/nikhil-vekariya-6b5907326?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className={`p-1 rounded transition-all hover:scale-110 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-win95-lightGray'}`} aria-label="LinkedIn">
          <Image src="/linkedin-pixel-BDPE24nd.png" alt="LinkedIn" width={24} height={24} className="pixelated" style={{ imageRendering: 'pixelated' }} unoptimized />
        </a>
        <a href="https://www.instagram.com/_nikhil_vekariya_?igsh=NGhnZXllZXU1czgx" target="_blank" rel="noopener noreferrer" className={`p-1 rounded transition-all hover:scale-110 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-win95-lightGray'}`} aria-label="Instagram">
          <Image src="/twitter-pixel-Cjv4CnRW.png" alt="Instagram" width={24} height={24} className="pixelated" style={{ imageRendering: 'pixelated' }} unoptimized />
        </a>
        <button onClick={onToggleDarkMode} className={`p-1 rounded transition-all hover:scale-110 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-win95-lightGray'}`} aria-label="Toggle Dark Mode" title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
          <span className="text-lg">{isDarkMode ? "🌙" : "☀️"}</span>
        </button>
        <div className={`text-xs font-bold px-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
          <span>{formatTime(time)}</span>
        </div>
      </div>
      </div>
    </>
  );
}