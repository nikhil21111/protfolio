"use client";

import { useState } from "react";

const education = [
  {
    id: 1,
    degree: "Bachelor of Science in Computer Science",
    institution: "Tech University",
    year: "2018 - 2022",
    gpa: "3.8/4.0",
    icon: "🎓",
    color: "from-blue-400 to-purple-400",
    achievements: ["Dean's List", "Honors Program", "CS Department Award"],
  },
  {
    id: 2,
    degree: "Full Stack Web Development Bootcamp",
    institution: "Code Academy Pro",
    year: "2022",
    gpa: "Certificate",
    icon: "💻",
    color: "from-green-400 to-teal-400",
    achievements: ["Top Graduate", "Final Project Award"],
  },
];

const certifications = [
  { name: "AWS Certified Solutions Architect", year: "2023", icon: "☁️", color: "bg-orange-100" },
  { name: "Google UX Design Professional", year: "2023", icon: "🎨", color: "bg-blue-100" },
  { name: "MongoDB Certified Developer", year: "2022", icon: "🍃", color: "bg-green-100" },
  { name: "React Advanced Patterns", year: "2023", icon: "⚛️", color: "bg-cyan-100" },
];

export default function Education() {
  const [hoveredCert, setHoveredCert] = useState<string | null>(null);

  return (
    <div className="p-6 space-y-4 overflow-auto h-full relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-5 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            📚
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="win95-border p-4 bg-gradient-to-r from-indigo-50 to-purple-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <h2 className="text-2xl font-bold mb-2 text-win95-blue flex items-center gap-2 relative z-10">
          🎓 <span className="animate-pulse">Education Journey</span>
        </h2>
        <p className="text-sm text-gray-700 relative z-10">My academic journey and certifications</p>
      </div>

      {/* Education timeline */}
      <div className="space-y-3 relative z-10">
        {education.map((edu, idx) => (
          <div
            key={edu.id}
            className="win95-border p-4 bg-white hover:scale-105 transition-all duration-300 relative overflow-hidden"
            style={{ animation: `slideInFromLeft 0.6s ease-out ${idx * 0.2}s both` }}
          >
            {/* Animated gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-r ${edu.color} opacity-5 hover:opacity-10 transition-opacity`}></div>
            
            {/* Timeline dot */}
            <div className="absolute -left-2 top-8 w-4 h-4 rounded-full bg-blue-500 animate-ping"></div>
            <div className="absolute -left-2 top-8 w-4 h-4 rounded-full bg-blue-600"></div>

            <div className="flex items-start space-x-3 mb-3 relative z-10">
              <span className="text-3xl animate-bounce" style={{ animationDuration: '2s', animationDelay: `${idx * 0.3}s` }}>
                {edu.icon}
              </span>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-win95-blue">{edu.degree}</h3>
                <p className="text-sm text-gray-700 font-semibold">{edu.institution}</p>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-xs text-gray-600 animate-pulse">📅 {edu.year}</span>
                  <span className="text-xs text-gray-600 font-bold animate-pulse">📊 {edu.gpa}</span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="win95-border-inset p-2 bg-gradient-to-r from-yellow-50 to-orange-50 relative z-10">
              <p className="text-xs font-bold mb-1 flex items-center gap-1">
                <span className="animate-pulse">🏆</span> Achievements:
              </p>
              <div className="flex flex-wrap gap-1">
                {edu.achievements.map((achievement, achIdx) => (
                  <span
                    key={achievement}
                    className="text-xs win95-button px-2 py-1 hover:scale-110 hover:bg-yellow-100 transition-all"
                    style={{ animation: `popIn 0.4s ease-out ${achIdx * 0.15}s both` }}
                  >
                    ⭐ {achievement}
                  </span>
                ))}
              </div>
            </div>

            {/* Animated progress bar */}
            <div className="mt-2 relative z-10">
              <div className="win95-border-inset bg-white p-0.5">
                <div className={`h-2 bg-gradient-to-r ${edu.color} animate-pulse`} style={{ width: edu.id === 1 ? '100%' : '100%' }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="win95-border p-4 bg-gradient-to-br from-cyan-50 to-blue-50 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1">
          <div className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-loading"></div>
        </div>
        <h3 className="font-bold mb-3 text-win95-blue flex items-center gap-2">
          📜 <span className="animate-pulse">Certifications</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {certifications.map((cert, idx) => (
            <div
              key={cert.name}
              className={`win95-border-inset p-3 ${cert.color} hover:scale-110 transition-all duration-300 cursor-pointer relative overflow-hidden`}
              style={{ animation: `zoomIn 0.4s ease-out ${idx * 0.1}s both` }}
              onMouseEnter={() => setHoveredCert(cert.name)}
              onMouseLeave={() => setHoveredCert(null)}
            >
              {/* Shine effect on hover */}
              {hoveredCert === cert.name && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shine"></div>
              )}
              
              <div className="flex items-center space-x-2 relative z-10">
                <span className={`text-2xl ${hoveredCert === cert.name ? 'animate-bounce' : ''}`}>
                  {cert.icon}
                </span>
                <div>
                  <p className="text-sm font-bold">{cert.name}</p>
                  <p className="text-xs text-gray-600 font-mono animate-pulse">{cert.year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          70% {
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(10deg);
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
        @keyframes shine {
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
