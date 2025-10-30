"use client";

export default function Resume() {
  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="win95-border p-2 bg-win95-gray flex items-center space-x-2">
        <button className="win95-button px-3 py-1 text-xs">📥 Download PDF</button>
        <button className="win95-button px-3 py-1 text-xs">🖨️ Print</button>
        <button className="win95-button px-3 py-1 text-xs">📧 Email</button>
      </div>

      {/* Resume Content */}
      <div className="flex-1 overflow-auto p-6 bg-white">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center win95-border p-6 bg-win95-lightGray">
            <h1 className="text-3xl font-bold mb-2">NIKHIL</h1>
            <p className="text-sm">Full Stack Developer | UI/UX Designer | Creative Technologist</p>
            <p className="text-xs mt-2 text-gray-600">
              📧 hello@nikhil.com | 💼 linkedin.com/in/nikhil | 🐙 github.com/nikhil
            </p>
          </div>

          {/* Summary */}
          <div>
            <h2 className="text-xl font-bold mb-2 text-win95-blue win95-border-inset px-2 py-1 bg-win95-lightGray">
              📋 PROFESSIONAL SUMMARY
            </h2>
            <p className="text-sm text-gray-800 leading-relaxed mt-2">
              Passionate full-stack developer with 5+ years of experience building modern web applications.
              Specializes in React, Next.js, and TypeScript. Known for creating intuitive user experiences
              and writing clean, maintainable code. Advocate for open-source and continuous learning.
            </p>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xl font-bold mb-2 text-win95-blue win95-border-inset px-2 py-1 bg-win95-lightGray">
              💼 WORK EXPERIENCE
            </h2>
            <div className="mt-2 space-y-4">
              <div className="win95-border p-3 bg-white">
                <h3 className="font-bold">Senior Frontend Developer</h3>
                <p className="text-sm text-gray-600">Tech Innovations Inc. | 2022 - Present</p>
                <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                  <li>Led development of customer-facing dashboard using Next.js and TypeScript</li>
                  <li>Improved page load times by 60% through code optimization</li>
                  <li>Mentored 3 junior developers in best practices</li>
                </ul>
              </div>
              <div className="win95-border p-3 bg-white">
                <h3 className="font-bold">Full Stack Developer</h3>
                <p className="text-sm text-gray-600">Creative Digital Studio | 2020 - 2022</p>
                <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                  <li>Built 20+ client websites using React and Node.js</li>
                  <li>Implemented CI/CD pipelines using GitHub Actions</li>
                  <li>Collaborated with designers to create pixel-perfect interfaces</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xl font-bold mb-2 text-win95-blue win95-border-inset px-2 py-1 bg-win95-lightGray">
              🎓 EDUCATION
            </h2>
            <div className="mt-2 win95-border p-3 bg-white">
              <h3 className="font-bold">Bachelor of Science in Computer Science</h3>
              <p className="text-sm text-gray-600">Tech University | 2018 - 2022 | GPA: 3.8/4.0</p>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-xl font-bold mb-2 text-win95-blue win95-border-inset px-2 py-1 bg-win95-lightGray">
              ⚡ SKILLS
            </h2>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className="win95-border p-2 bg-white">
                <p className="font-bold text-sm">Frontend:</p>
                <p className="text-xs">React, Next.js, TypeScript, Tailwind CSS</p>
              </div>
              <div className="win95-border p-2 bg-white">
                <p className="font-bold text-sm">Backend:</p>
                <p className="text-xs">Node.js, Python, PostgreSQL, MongoDB</p>
              </div>
              <div className="win95-border p-2 bg-white">
                <p className="font-bold text-sm">Tools:</p>
                <p className="text-xs">Git, Docker, AWS, Figma</p>
              </div>
              <div className="win95-border p-2 bg-white">
                <p className="font-bold text-sm">Soft Skills:</p>
                <p className="text-xs">Leadership, Communication, Problem Solving</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
