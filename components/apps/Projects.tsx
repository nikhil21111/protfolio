"use client";

import { useState } from "react";

const projects = [
  {
    id: 1,
    name: "Nikhil's Retro Portfolio",
    description: "A Windows 95-inspired portfolio website with draggable windows and retro aesthetics",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    status: "In Progress",
    icon: "💻",
    color: "from-blue-400 to-cyan-400",
  },
  {
    id: 2,
    name: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration and admin dashboard",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    status: "Completed",
    icon: "🛍️",
    color: "from-green-400 to-emerald-400",
  },
  {
    id: 3,
    name: "Social Media Dashboard",
    description: "Analytics dashboard for tracking social media metrics across multiple platforms",
    tech: ["Vue.js", "Python", "PostgreSQL", "Chart.js"],
    status: "Completed",
    icon: "📊",
    color: "from-purple-400 to-pink-400",
  },
  {
    id: 4,
    name: "AI Chatbot",
    description: "Intelligent chatbot powered by GPT for customer service automation",
    tech: ["Python", "OpenAI API", "FastAPI", "React"],
    status: "Completed",
    icon: "🤖",
    color: "from-orange-400 to-red-400",
  },
  {
    id: 5,
    name: "Task Manager Pro",
    description: "Collaborative task management app with real-time updates",
    tech: ["Next.js", "Firebase", "TypeScript", "Zustand"],
    status: "In Progress",
    icon: "✅",
    color: "from-teal-400 to-blue-400",
  },
];

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <div className="p-6 space-y-4 overflow-auto h-full relative">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Header with retro loading bar */}
      <div className="win95-border p-4 bg-gradient-to-r from-blue-50 to-purple-50 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1">
          <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-loading"></div>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-win95-blue flex items-center gap-2">
          💼 <span className="animate-pulse">My Projects</span>
        </h2>
        <p className="text-sm text-gray-700">A collection of projects I&apos;ve built and deployed</p>
      </div>

      {/* Animated project cards */}
      <div className="space-y-3 relative z-10">
        {projects.map((project, idx) => (
          <div
            key={project.id}
            className="win95-border p-4 bg-white hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden"
            style={{ animation: `slideInRight 0.5s ease-out ${idx * 0.1}s both` }}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {/* Animated gradient background on hover */}
            <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 hover:opacity-10 transition-opacity duration-500`}></div>
            
            {/* Animated corner accent */}
            <div className={`absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent transition-all duration-300 ${
              hoveredProject === project.id ? 'border-r-blue-400' : 'border-r-transparent'
            }`}></div>

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className={`text-2xl ${hoveredProject === project.id ? 'animate-bounce' : ''}`}>
                    {project.icon}
                  </span>
                  <h3 className="font-bold text-lg text-win95-blue">{project.name}</h3>
                </div>
                <span
                  className={`win95-border-inset px-2 py-1 text-xs font-bold animate-pulse ${
                    project.status === "Completed" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              
              <p className="text-sm text-gray-700 mb-3">{project.description}</p>
              
              {/* Animated tech stack */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, techIdx) => (
                  <span
                    key={tech}
                    className="win95-button text-xs px-2 py-1 hover:scale-110 hover:bg-blue-100 transition-all"
                    style={{ animation: `fadeIn 0.5s ease-out ${techIdx * 0.1}s both` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Progress bar for in-progress projects */}
            {project.status === "In Progress" && (
              <div className="mt-3 relative">
                <div className="win95-border-inset bg-white p-1">
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse" 
                       style={{ width: '65%' }}></div>
                </div>
                <span className="text-[10px] text-gray-500 absolute -top-4 right-0">65% Complete</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Animated CTA button */}
      <div className="win95-border p-4 bg-gradient-to-r from-cyan-50 to-blue-50 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-200 opacity-0 animate-pulse"></div>
        <button className="win95-button px-6 py-3 font-bold text-lg hover:scale-110 hover:bg-blue-100 transition-all relative z-10 animate-bounce"
                style={{ animationDuration: '2s' }}>
          View More on GitHub →
        </button>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
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
      `}</style>
    </div>
  );
}
