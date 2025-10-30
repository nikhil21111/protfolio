"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface ShutdownScreenProps {
  onComplete: () => void;
  onClose: () => void;
}

export default function ShutdownScreen({ onComplete, onClose }: ShutdownScreenProps) {
  const [phase, setPhase] = useState<'menu' | 'shutdown' | 'complete'>('menu');
  const [progress, setProgress] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);

  const shutdownMessages = [
    "Closing all applications...",
    "Saving system state...",
    "Clearing memory buffers...",
    "Disconnecting neural networks...",
    "Shutting down quantum processors...",
    "Goodbye! 👋",
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  const handleShutdown = () => {
    setPhase('shutdown');
  };

  useEffect(() => {
    if (phase === 'shutdown') {
      // Progress animation
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
              setPhase('complete');
              setTimeout(onComplete, 2000);
            }, 1000);
            return 100;
          }
          return prev + 2;
        });
      }, 60);

      // Message cycling
      const messageInterval = setInterval(() => {
        setCurrentMessage((prev) => (prev + 1) % shutdownMessages.length);
      }, 800);

      // Glitch effect
      const glitchInterval = setInterval(() => {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 100);
      }, 1500);

      return () => {
        clearInterval(progressInterval);
        clearInterval(messageInterval);
        clearInterval(glitchInterval);
      };
    }
  }, [phase, onComplete]);

  if (phase === 'complete') {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2 }}
        className="fixed inset-0 bg-black z-[100000] flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 0, rotate: 360 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="text-cyan-400 text-6xl font-bold"
          style={{
            textShadow: "0 0 20px #00ffff, 0 0 40px #00ffff, 0 0 60px #00ffff",
          }}
        >
          ⚡
        </motion.div>
      </motion.div>
    );
  }

  if (phase === 'shutdown') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black z-[100000] overflow-hidden"
      >
        {/* Matrix rain effect */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-red-500 font-mono text-xs"
              initial={{ y: -100, x: i * 60 }}
              animate={{ y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000 }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                delay: Math.random(),
              }}
            >
              {Array.from({ length: 15 }, () => 
                String.fromCharCode(Math.random() * 26 + 65)
              ).join('\n')}
            </motion.div>
          ))}
        </div>

        {/* Red warning particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-red-500 rounded-full"
              initial={{
                x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
                y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
              }}
              animate={{
                y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
                opacity: [1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="scanlines" />

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center space-y-8 px-4 max-w-2xl">
            {/* Shutdown icon with glitch */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className={`text-8xl mb-8 ${glitchActive ? 'glitch-shutdown' : ''}`}
            >
              🔴
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-4"
              style={{
                background: "linear-gradient(45deg, #ff0000, #ff6600, #ff0000)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200% 200%",
                animation: "gradient-shift 3s ease infinite",
              }}
            >
              SYSTEM SHUTDOWN
            </motion.h1>

            {/* Messages */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMessage}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="h-16 flex items-center justify-center"
              >
                <p className="text-red-400 font-mono text-lg md:text-xl glow-text-red">
                  {shutdownMessages[currentMessage]}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Progress bar */}
            <div className="w-full space-y-4">
              <div className="relative h-10 bg-gray-900 border-2 border-red-500 rounded-lg overflow-hidden shadow-lg shadow-red-500/50">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                
                <motion.div
                  className="relative h-full bg-gradient-to-r from-red-600 via-orange-500 to-red-600"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    className="text-white font-bold text-sm drop-shadow-lg"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    {Math.round(progress)}%
                  </motion.span>
                </div>
              </div>

              {/* Warning text */}
              <motion.p
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-yellow-400 font-mono text-sm"
              >
                ⚠️ Do not close this window ⚠️
              </motion.p>
            </div>

            {/* Spinning loader */}
            <motion.div
              className="relative w-20 h-20 mx-auto"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-0 border-4 border-red-500/30 rounded-full" />
              <motion.div
                className="absolute inset-2 border-4 border-t-red-500 border-r-orange-500 border-b-transparent border-l-transparent rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>
        </div>

        <style jsx>{`
          .glow-text-red {
            text-shadow: 0 0 10px rgba(239, 68, 68, 0.8),
                         0 0 20px rgba(239, 68, 68, 0.6),
                         0 0 30px rgba(239, 68, 68, 0.4);
          }

          .glitch-shutdown {
            animation: glitch-shutdown 0.3s infinite;
          }

          @keyframes glitch-shutdown {
            0%, 100% {
              transform: translate(0) scale(1);
              filter: hue-rotate(0deg);
            }
            25% {
              transform: translate(-5px, 5px) scale(1.05);
              filter: hue-rotate(90deg);
            }
            50% {
              transform: translate(5px, -5px) scale(0.95);
              filter: hue-rotate(180deg);
            }
            75% {
              transform: translate(-5px, -5px) scale(1.02);
              filter: hue-rotate(270deg);
            }
          }
        `}</style>
      </motion.div>
    );
  }

  // Start menu phase
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100000] flex items-end justify-start"
        onClick={() => onClose()}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

        {/* Start Menu */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="relative bottom-12 left-0 ml-2 mb-1 win95-border bg-win95-gray w-80 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold px-4 py-2 flex items-center space-x-2">
            <span className="text-2xl">🪟</span>
            <span>Windows 95</span>
          </div>

          {/* Menu Items */}
          <div className="p-2 space-y-1">
            <button
              className="w-full text-left px-4 py-3 hover:bg-blue-600 hover:text-white transition-colors flex items-center space-x-3 rounded"
              onClick={() => window.open('https://github.com/nikhil21111', '_blank')}
            >
              <span className="text-2xl">📁</span>
              <div>
                <div className="font-bold">Programs</div>
                <div className="text-xs opacity-70">View my projects</div>
              </div>
            </button>

            <button
              className="w-full text-left px-4 py-3 hover:bg-blue-600 hover:text-white transition-colors flex items-center space-x-3 rounded"
              onClick={() => window.open('https://www.linkedin.com/in/nikhil-vekariya-6b5907326', '_blank')}
            >
              <span className="text-2xl">💼</span>
              <div>
                <div className="font-bold">Documents</div>
                <div className="text-xs opacity-70">Professional info</div>
              </div>
            </button>

            <button
              className="w-full text-left px-4 py-3 hover:bg-blue-600 hover:text-white transition-colors flex items-center space-x-3 rounded"
              onClick={() => window.open('https://www.instagram.com/_nikhil_vekariya_', '_blank')}
            >
              <span className="text-2xl">📸</span>
              <div>
                <div className="font-bold">Instagram</div>
                <div className="text-xs opacity-70">Follow my journey</div>
              </div>
            </button>

            <div className="border-t border-gray-400 my-2"></div>

            <button
              className="w-full text-left px-4 py-3 hover:bg-red-600 hover:text-white transition-colors flex items-center space-x-3 rounded font-bold"
              onClick={handleShutdown}
            >
              <span className="text-2xl">⚡</span>
              <div>
                <div>Shut Down...</div>
                <div className="text-xs opacity-70 font-normal">Exit the website</div>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="bg-gray-300 px-4 py-2 text-xs text-gray-700 border-t border-gray-400">
            Nikhil&apos;s Retro Portfolio © 2025
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
