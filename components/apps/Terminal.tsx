"use client";

import { useState } from "react";

interface TerminalProps {
  userName: string;
}

export default function Terminal({ userName }: TerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "Nikhil Terminal v1.0",
    "Type 'help' for available commands",
    "",
  ]);

  const commands: Record<string, () => string> = {
    help: () => `Available commands:
- help: Show this help message
- about: About me
- skills: List my skills
- projects: View my projects
- contact: Get contact information
- clear: Clear terminal
- whoami: Who are you?
- date: Show current date
- echo [text]: Echo back text`,
    about: () => "I'm Nikhil, a passionate developer who creates unique web experiences!",
    skills: () => "React, Next.js, TypeScript, Node.js, Python, PostgreSQL, AWS, Docker",
    projects: () => "🚀 Retro Portfolio, E-Commerce Platform, AI Chatbot, Task Manager Pro, and more!",
    contact: () => "📧 hello@nikhil.com | 💼 linkedin.com/in/nikhil | 🐙 github.com/nikhil",
    whoami: () => `You are: ${userName}`,
    date: () => new Date().toString(),
    clear: () => "CLEAR",
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const parts = trimmedCmd.split(" ");
    const command = parts[0];

    let output = "";

    if (command === "clear") {
      setHistory([]);
      return;
    }

    if (command === "echo") {
      output = parts.slice(1).join(" ");
    } else if (commands[command]) {
      output = commands[command]();
    } else if (command === "") {
      output = "";
    } else {
      output = `Command not found: ${command}. Type 'help' for available commands.`;
    }

    setHistory([...history, `> ${cmd}`, output, ""]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <div className="h-full flex flex-col bg-black text-green-400 font-mono">
      {/* Terminal Output */}
      <div className="flex-1 overflow-auto p-4 text-sm">
        {history.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
      </div>

      {/* Terminal Input */}
      <form onSubmit={handleSubmit} className="flex items-center p-2 border-t border-green-400">
        <span className="mr-2">{">"}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-green-400"
          autoFocus
          spellCheck={false}
        />
      </form>
    </div>
  );
}
