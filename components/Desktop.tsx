"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Taskbar from "./Taskbar";
import Window from "./Window";
import DesktopIcon from "./DesktopIcon";
import { apps } from "@/lib/apps";

interface DesktopProps {
  userName: string;
}

export default function Desktop({ userName }: DesktopProps) {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  const [time, setTime] = useState(new Date());
  const [visitorCount, setVisitorCount] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    // Get visitor count from localStorage
    const count = parseInt(localStorage.getItem("visitorCount") || "0");
    const newCount = count + 1;
    localStorage.setItem("visitorCount", newCount.toString());
    setVisitorCount(newCount);

    // Get dark mode preference from localStorage
    const darkModePreference = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(darkModePreference);

    return () => clearInterval(timer);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
  };

  const openApp = (appId: string) => {
    if (!openWindows.includes(appId)) {
      setOpenWindows([...openWindows, appId]);
    }
    setActiveWindow(appId);
    setMinimizedWindows(minimizedWindows.filter((id) => id !== appId));
  };

  const closeWindow = (appId: string) => {
    setOpenWindows(openWindows.filter((id) => id !== appId));
    setMinimizedWindows(minimizedWindows.filter((id) => id !== appId));
    if (activeWindow === appId) {
      setActiveWindow(openWindows[openWindows.length - 2] || null);
    }
  };

  const minimizeWindow = (appId: string) => {
    if (!minimizedWindows.includes(appId)) {
      setMinimizedWindows([...minimizedWindows, appId]);
    }
    if (activeWindow === appId) {
      setActiveWindow(null);
    }
  };

  const restoreWindow = (appId: string) => {
    setMinimizedWindows(minimizedWindows.filter((id) => id !== appId));
    setActiveWindow(appId);
  };

  return (
    <div className="fixed inset-0 bg-win95-desktop overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
        style={{
          backgroundImage: isDarkMode 
            ? "url('/night-bg-DNB3MrhR.gif')" 
            : "url('/desktop-bg-BzaUDpzQ.gif')",
          opacity: 0.95,
        }}
      />
      
      {/* Scanlines effect */}
      <div className="scanlines" />

      {/* Desktop Icons Grid - Left side, 2 columns layout (first 5 apps) */}
      <div className="absolute left-8 top-8 grid grid-cols-2 gap-x-8 gap-y-6">
        {apps.filter(app => !['minimarket', 'games', 'contactme'].includes(app.id)).map((app) => (
          <DesktopIcon
            key={app.id}
            app={app}
            onDoubleClick={() => openApp(app.id)}
          />
        ))}
      </div>

      {/* Right Side Layout - Sticky note and icons */}
      <div className="absolute right-8 top-8 flex flex-col items-center gap-4">
        {/* MiniMarket Sticky Note - Top */}
        <button
          onDoubleClick={() => openApp('minimarket')}
          className="bg-yellow-200 shadow-2xl rounded-sm p-3 w-64 transform rotate-1 hover:rotate-0 transition-transform border-t-4 border-yellow-300"
        >
          <div className="text-center mb-2 font-mono text-xs font-bold text-gray-800 border-b-2 border-gray-400 pb-1">
            🛒 NIK&apos;S MINI-MARKET
          </div>
          <div className="font-mono text-[10px] text-gray-700 space-y-1">
            <div className="font-bold mb-1">ITEMS PURCHASED</div>
            <div className="border-b border-gray-400 mb-1"></div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" checked readOnly className="w-3 h-3" />
              <span>Machine Learning ₹0.00</span>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" checked readOnly className="w-3 h-3" />
              <span>Web3 Curiosity ₹0.00</span>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" checked readOnly className="w-3 h-3" />
              <span>Debugging Snacks ₹∞</span>
            </div>
            <div className="border-b border-gray-400 my-1"></div>
            <div className="font-bold">TOTAL ........ PASSION</div>
            <div className="text-center text-[9px] mt-2 italic text-gray-600">
              &quot;Keep learning, keep coding.&quot;
              <br />
              #CODE-RECEIPT
            </div>
          </div>
        </button>

        {/* Game.exe - Below sticky note with small gap */}
        <div className="mt-2">
          {apps.filter(app => app.id === 'games').map((app) => (
            <DesktopIcon
              key={app.id}
              app={app}
              onDoubleClick={() => openApp(app.id)}
            />
          ))}
        </div>

        {/* LetsConnect.exe - Below Game.exe with small gap */}
        <div className="mt-2">
          {apps.filter(app => app.id === 'contactme').map((app) => (
            <DesktopIcon
              key={app.id}
              app={app}
              onDoubleClick={() => openApp(app.id)}
            />
          ))}
        </div>
      </div>

      {/* Small Butterflies scattered in empty spaces - avoiding all icons */}
      {/* LEFT SIDE - 1 butterfly with flutter effect */}
      <div 
        className="absolute left-4 top-1/2 animate-butterfly-flutter" 
        style={{ 
          animationDelay: '1s', 
          animationDuration: '3s',
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
        }}
      >
        <Image 
          src="/butterfly-D9rgVmYV.gif" 
          alt="Butterfly"
          width={48}
          height={48}
          className="pixelated hover:scale-125 transition-transform duration-300"
          style={{ imageRendering: 'pixelated' }}
          unoptimized
        />
      </div>

      {/* RIGHT SIDE - 1 butterfly with flutter effect */}
      <div 
        className="absolute right-4 top-1/2 animate-butterfly-flutter" 
        style={{ 
          animationDelay: '1.2s', 
          animationDuration: '3.2s',
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
        }}
      >
        <Image 
          src="/butterfly-D9rgVmYV.gif" 
          alt="Butterfly"
          width={48}
          height={48}
          className="pixelated hover:scale-125 transition-transform duration-300"
          style={{ imageRendering: 'pixelated' }}
          unoptimized
        />
      </div>

      {/* CENTER Area butterflies for decoration with enhanced effects */}
      <div 
        className="absolute left-1/3 top-1/3 animate-butterfly-float" 
        style={{ 
          animationDelay: '0.3s', 
          animationDuration: '4s',
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
        }}
      >
        <Image 
          src="/butterfly-D9rgVmYV.gif" 
          alt="Butterfly"
          width={40}
          height={40}
          className="pixelated hover:scale-125 transition-transform duration-300"
          style={{ imageRendering: 'pixelated' }}
          unoptimized
        />
      </div>

      <div 
        className="absolute left-1/2 bottom-32 animate-butterfly-zigzag" 
        style={{ 
          animationDelay: '2s', 
          animationDuration: '5s',
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
        }}
      >
        <Image 
          src="/butterfly-D9rgVmYV.gif" 
          alt="Butterfly"
          width={40}
          height={40}
          className="pixelated hover:scale-125 transition-transform duration-300"
          style={{ imageRendering: 'pixelated' }}
          unoptimized
        />
      </div>

      {/* Open Windows */}
      {openWindows.map((appId, index) => {
        const app = apps.find((a) => a.id === appId);
        if (!app) return null;

        const isMinimized = minimizedWindows.includes(appId);
        const isActive = activeWindow === appId;

        return (
          <Window
            key={appId}
            app={app}
            isActive={isActive}
            isMinimized={isMinimized}
            onClose={() => closeWindow(appId)}
            onMinimize={() => minimizeWindow(appId)}
            onFocus={() => setActiveWindow(appId)}
            zIndex={1000 + index}
            userName={userName}
          />
        );
      })}

      {/* Taskbar */}
      <Taskbar
        openWindows={openWindows}
        minimizedWindows={minimizedWindows}
        activeWindow={activeWindow}
        onWindowClick={restoreWindow}
        time={time}
        visitorCount={visitorCount}
        musicPlaying={musicPlaying}
        onToggleMusic={() => setMusicPlaying(!musicPlaying)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />
    </div>
  );
}
