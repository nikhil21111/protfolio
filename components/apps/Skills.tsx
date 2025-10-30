"use client";

import { useState, useEffect } from "react";

const skillCategories = [
  {
    category: "Frontend",
    icon: "🎨",
    color: "from-pink-400 to-rose-400",
    skills: [
      { name: "React", level: 95, icon: "⚛️" },
      { name: "Next.js", level: 90, icon: "▲" },
      { name: "TypeScript", level: 88, icon: "🔷" },
      { name: "Tailwind CSS", level: 92, icon: "💨" },
      { name: "Vue.js", level: 75, icon: "💚" },
    ],
  },
  {
    category: "Backend",
    icon: "⚙️",
    color: "from-blue-400 to-cyan-400",
    skills: [
      { name: "Node.js", level: 87, icon: "🟢" },
      { name: "Python", level: 82, icon: "🐍" },
      { name: "PostgreSQL", level: 80, icon: "🐘" },
      { name: "MongoDB", level: 85, icon: "🍃" },
      { name: "GraphQL", level: 78, icon: "◆" },
    ],
  },
  {
    category: "Tools & Others",
    icon: "🛠️",
    color: "from-purple-400 to-indigo-400",
    skills: [
      { name: "Git", level: 90, icon: "🔀" },
      { name: "Docker", level: 75, icon: "🐳" },
      { name: "AWS", level: 70, icon: "☁️" },
      { name: "Figma", level: 85, icon: "🎨" },
      { name: "VS Code", level: 95, icon: "💻" },
    ],
  },
];

export default function Skills() {
  const [animatedLevels, setAnimatedLevels] = useState<{[key: string]: number}>({});
  const [displayPercentages, setDisplayPercentages] = useState<{[key: string]: number}>({});

  useEffect(() => {
    // Initialize all skills at 0
    const initialLevels: {[key: string]: number} = {};
    skillCategories.forEach(cat => {
      cat.skills.forEach(skill => {
        initialLevels[skill.name] = 0;
      });
    });
    setAnimatedLevels(initialLevels);
    setDisplayPercentages(initialLevels);

    // Start animation after delay
    const timer = setTimeout(() => {
      skillCategories.forEach((cat) => {
        cat.skills.forEach((skill, index) => {
          // Stagger each skill animation
          setTimeout(() => {
            // Animate the bar width
            setAnimatedLevels((prev) => ({ ...prev, [skill.name]: skill.level }));
            
            // Animate the percentage counter
            let currentPercent = 0;
            const targetPercent = skill.level;
            const incrementTime = 20; // Update every 20ms
            const totalTime = 1000; // Take 1 second to count up
            const increment = (targetPercent / totalTime) * incrementTime;

            const percentInterval = setInterval(() => {
              currentPercent += increment;
              if (currentPercent >= targetPercent) {
                currentPercent = targetPercent;
                clearInterval(percentInterval);
              }
              setDisplayPercentages((prev) => ({ 
                ...prev, 
                [skill.name]: Math.round(currentPercent) 
              }));
            }, incrementTime);
          }, index * 150); // 150ms delay between each skill
        });
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 space-y-4 overflow-auto h-full relative">
      {/* Animated matrix rain effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-500 font-mono text-xs animate-matrix"
            style={{
              left: `${i * 7}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            01010101
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="win95-border p-4 bg-gradient-to-r from-purple-50 to-blue-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <h2 className="text-2xl font-bold mb-2 text-win95-blue flex items-center gap-2 relative z-10">
          ⚡ <span className="animate-pulse">Skills & Expertise</span>
        </h2>
        <p className="text-sm text-gray-700 relative z-10">My technical proficiency and expertise</p>
      </div>

      {/* Skill categories */}
      {skillCategories.map((category, catIdx) => (
        <div
          key={category.category}
          className="win95-border p-4 bg-white relative overflow-hidden"
          style={{ animation: `slideInLeft 0.5s ease-out ${catIdx * 0.15}s both` }}
        >
          {/* Category header */}
          <div className="flex items-center space-x-2 mb-4 relative z-10">
            <span className="text-3xl animate-bounce" style={{ animationDuration: '2s', animationDelay: `${catIdx * 0.2}s` }}>
              {category.icon}
            </span>
            <h3 className="font-bold text-lg text-win95-blue">{category.category}</h3>
          </div>

          {/* Animated background gradient */}
          <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${category.color} opacity-10 rounded-full blur-2xl`}></div>

          {/* Skills */}
          <div className="space-y-3 relative z-10">
            {category.skills.map((skill, skillIdx) => (
              <div key={skill.name} style={{ animation: `fadeInUp 0.5s ease-out ${(catIdx * 0.15) + (skillIdx * 0.1)}s both` }}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold flex items-center gap-2">
                    <span className="animate-pulse">{skill.icon}</span>
                    {skill.name}
                  </span>
                  <span className="text-xs text-gray-600 font-mono font-bold animate-pulse bg-blue-100 px-2 py-1 rounded">
                    {displayPercentages[skill.name] || 0}%
                  </span>
                </div>
                
                {/* Animated progress bar */}
                <div className="win95-border-inset bg-gray-100 p-0.5 relative overflow-hidden">
                  {/* Background shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer"></div>
                  
                  {/* Progress fill */}
                  <div
                    className={`h-4 bg-gradient-to-r ${category.color} relative overflow-hidden transition-all duration-1000 ease-out`}
                    style={{ width: `${animatedLevels[skill.name] || 0}%` }}
                  >
                    {/* Gloss effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent"></div>
                    {/* Animated stripes */}
                    <div className="absolute inset-0 bg-stripes opacity-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Animated soft skills */}
      <div className="win95-border p-4 bg-gradient-to-br from-yellow-50 to-orange-50 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1">
          <div className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 animate-loading"></div>
        </div>
        <h3 className="font-bold mb-3 text-win95-blue flex items-center gap-2">
          🌟 <span className="animate-pulse">Soft Skills</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            "Problem Solving",
            "Team Collaboration",
            "Communication",
            "Time Management",
            "Creativity",
            "Adaptability",
            "Leadership",
            "Critical Thinking",
          ].map((skill, idx) => (
            <span
              key={skill}
              className="win95-button text-xs px-3 py-1 hover:scale-110 hover:bg-yellow-100 transition-all cursor-pointer"
              style={{ animation: `popIn 0.5s ease-out ${idx * 0.1}s both` }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes matrix {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        .bg-stripes {
          background-image: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255,255,255,0.1) 10px,
            rgba(255,255,255,0.1) 20px
          );
          animation: stripes-scroll 1s linear infinite;
        }
        @keyframes stripes-scroll {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 28px 28px;
          }
        }
      `}</style>
    </div>
  );
}
