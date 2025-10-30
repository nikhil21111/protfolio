"use client";

import { useState, useEffect } from "react";

interface AboutMeProps {
  userName: string;
}

export default function AboutMe({ userName }: AboutMeProps) {
  const [funFact, setFunFact] = useState("");
  const [glitchActive, setGlitchActive] = useState(false);
  const [typedText, setTypedText] = useState("");

  const facts = [
    "I debug with console.log() like a pro! 🐛",
    "Coffee + Code = ❤️",
    "I speak fluent JavaScript, TypeScript, and Emoji 🚀",
    "My code is poetry... sometimes haiku 📝",
    "I've turned 'Hello World' into an art form 🎨",
  ];

  const fullText = `Hello, ${userName}! 👋 Welcome to my retro digital space...`;

  useEffect(() => {
    setFunFact(facts[Math.floor(Math.random() * facts.length)]);
    
    // Typing animation
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.substring(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 5000);

    return () => {
      clearInterval(typingInterval);
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <div className="p-6 space-y-6 relative overflow-hidden">
      {/* Animated scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute w-full h-full bg-gradient-to-b from-transparent via-black to-transparent animate-pulse" 
             style={{ animation: 'scan 8s linear infinite' }}></div>
      </div>

      {/* Animated profile card */}
      <div className={`win95-border p-4 bg-gradient-to-br from-cyan-50 to-blue-50 relative overflow-hidden ${glitchActive ? 'animate-pulse' : ''}`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-30 animate-bounce" 
             style={{ animationDuration: '3s' }}></div>
        
        <div className="flex items-center gap-4 mb-4">
          {/* Animated avatar */}
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 animate-pulse flex items-center justify-center text-4xl">
              👨‍💻
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white animate-ping"></div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-win95-blue animate-pulse">👤 Nikhil Dev</h2>
            <p className="text-sm text-gray-600">Full-Stack Developer</p>
          </div>
        </div>

        {/* Typing effect text */}
        <p className="text-gray-800 leading-relaxed mb-4 font-mono">
          {typedText}<span className="animate-pulse">|</span>
        </p>
        
        <p className="text-gray-800 leading-relaxed">
          I specialize in full-stack development, UI/UX design, and creating interactive experiences
          that make people smile. This portfolio is a tribute to the golden age of computing while
          showcasing cutting-edge web technologies.
        </p>
      </div>

      {/* Animated fun fact */}
      <div className="win95-border-inset p-4 bg-yellow-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 animate-pulse"></div>
        <h3 className="font-bold mb-2 text-win95-blue flex items-center gap-2">
          💡 <span className="animate-bounce">Random Fun Fact:</span>
        </h3>
        <p className="italic text-gray-700 animate-pulse">{funFact}</p>
      </div>

      {/* Animated stats grid */}
      <div className="win95-border p-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <h3 className="font-bold mb-3 text-win95-blue animate-pulse">🎯 Quick Stats:</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Years of Experience", value: "5+", delay: "0s" },
            { label: "Projects Completed", value: "50+", delay: "0.2s" },
            { label: "Coffee Consumed", value: "∞", delay: "0.4s" },
            { label: "Lines of Code", value: "100k+", delay: "0.6s" }
          ].map((stat, idx) => (
            <div key={idx} 
                 className="win95-border-inset p-2 bg-white hover:scale-105 transition-transform cursor-pointer"
                 style={{ animation: `fadeInUp 0.5s ease-out ${stat.delay} both` }}>
              <div className="text-xs text-gray-600">{stat.label}</div>
              <div className="text-xl font-bold text-win95-blue animate-bounce" 
                   style={{ animationDuration: '2s', animationDelay: stat.delay }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animated interests */}
      <div className="win95-border p-4 bg-gradient-to-br from-green-50 to-teal-50">
        <h3 className="font-bold mb-2 text-win95-blue animate-pulse">🌟 Interests:</h3>
        <div className="flex flex-wrap gap-2">
          {["Web Development", "UI/UX Design", "Retro Computing", "Open Source", "Gaming", "Art"].map((interest, idx) => (
            <span key={interest} 
                  className="win95-button text-xs px-3 py-1 hover:scale-110 hover:bg-blue-200 transition-all cursor-pointer"
                  style={{ animation: `slideIn 0.5s ease-out ${idx * 0.1}s both` }}>
              {interest}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
