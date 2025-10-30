"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface BootScreenProps {
  userName: string;
}

export default function BootScreen({ userName }: BootScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showMatrix, setShowMatrix] = useState(true);
  const [glitchActive, setGlitchActive] = useState(false);

  const bootMessages = [
    "Initializing quantum processors...",
    "Loading neural networks...",
    "Decrypting encrypted memories...",
    "Establishing secure connection...",
    `Welcome back, ${userName}!`,
    "Entering the digital realm...",
  ];

  useEffect(() => {
    const matrixTimer = setTimeout(() => setShowMatrix(false), 1500);
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1.5;
      });
    }, 50);

    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % bootMessages.length);
    }, 600);

    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 100);
    }, 2000);

    return () => {
      clearTimeout(matrixTimer);
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      clearInterval(glitchInterval);
    };
  }, [userName]);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="grid-background"></div>
      </div>

      <AnimatePresence>
        {showMatrix && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 overflow-hidden"
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-green-500 font-mono text-xs"
                initial={{ y: -100, x: i * 40 }}
                animate={{ 
                  y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000 
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                {Array.from({ length: 20 }, () => 
                  String.fromCharCode(Math.random() * 26 + 65)
                ).join('\n')}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => {
          const randomX = typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0;
          const randomY = typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0;
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              initial={{ x: randomX, y: randomY }}
              animate={{
                x: [randomX, Math.random() * 800, Math.random() * 800],
                y: [randomY, Math.random() * 600, Math.random() * 600],
                scale: [1, 2, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          );
        })}
      </div>

      <div className="scanlines" />

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center space-y-8 px-4">
          <motion.div
            initial={{ scale: 0, rotateY: 180 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{ 
              scale: { duration: 1, type: "spring" },
              rotateY: { duration: 1 },
            }}
            className={`text-6xl md:text-9xl font-bold mb-8 ${glitchActive ? 'glitch' : ''}`}
            style={{
              background: "linear-gradient(45deg, #00ffff, #ff00ff, #00ffff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% 200%",
              animation: "gradient-shift 3s ease infinite",
            }}
          >
            NIKHIL
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-cyan-400 text-xl md:text-2xl font-mono mb-8"
          >
            <span className="inline-block">
              {`> RETRO_COMPUTING_EXPERIENCE.EXE`}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                _
              </motion.span>
            </span>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div 
              className="h-20 flex items-center justify-center"
              key={currentMessage}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
            >
              <p className="text-green-400 font-mono text-sm md:text-lg glow-text">
                {bootMessages[currentMessage]}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="w-full max-w-2xl mx-auto space-y-4">
            <div className="relative h-8 bg-gray-900 border-2 border-cyan-500 rounded-lg overflow-hidden shadow-lg shadow-cyan-500/50">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              
              <motion.div
                className="relative h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
                style={{ width: `%` }}
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

            <div className="flex justify-center space-x-6 text-xs font-mono">
              {['CPU', 'RAM', 'GPU', 'NET'].map((label, idx) => (
                <motion.div
                  key={label}
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                >
                  <motion.div
                    className={`w-2 h-2 rounded-full `}
                    animate={
                      progress > 25 * (idx + 1)
                        ? { boxShadow: ['0 0 5px #4ade80', '0 0 15px #4ade80', '0 0 5px #4ade80'] }
                        : {}
                    }
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className={progress > 25 * (idx + 1) ? 'text-green-400' : 'text-gray-600'}>
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="relative w-24 h-24 mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full" />
            <motion.div
              className="absolute inset-2 border-4 border-t-cyan-500 border-r-purple-500 border-b-transparent border-l-transparent rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-4 border-4 border-transparent border-t-purple-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .grid-background {
          background-image: 
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: grid-move 20s linear infinite;
        }

        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .glow-text {
          text-shadow: 0 0 10px rgba(34, 197, 94, 0.8),
                       0 0 20px rgba(34, 197, 94, 0.6),
                       0 0 30px rgba(34, 197, 94, 0.4);
        }

        .glitch {
          animation: glitch 0.3s infinite;
        }

        @keyframes glitch {
          0%, 100% {
            transform: translate(0);
            filter: hue-rotate(0deg);
          }
          25% {
            transform: translate(-2px, 2px);
            filter: hue-rotate(90deg);
          }
          50% {
            transform: translate(2px, -2px);
            filter: hue-rotate(180deg);
          }
          75% {
            transform: translate(-2px, -2px);
            filter: hue-rotate(270deg);
          }
        }
      `}</style>
    </div>
  );
}
