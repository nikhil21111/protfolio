"use client";

import { useState } from "react";

interface ChatBotProps {
  userName: string;
}

interface Message {
  text: string;
  sender: "user" | "bot";
}

export default function ChatBot({ userName }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    { text: `Hello ${userName}! 👋 I'm your personal AI assistant. How can I help you today?`, sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const botResponses: Record<string, string> = {
    hello: "Hi there! How can I assist you?",
    hi: "Hello! What would you like to know?",
    help: "I can answer questions about Nikhil's skills, projects, experience, and more!",
    skills: "Nikhil specializes in React, Next.js, TypeScript, Node.js, Python, and more!",
    projects: "Nikhil has built amazing projects including e-commerce platforms, AI chatbots, and this retro portfolio!",
    contact: "You can reach out via email at hello@nikhil.com or connect on LinkedIn!",
    experience: "Nikhil has 5+ years of experience in full-stack development with a focus on modern web technologies.",
    thanks: "You're welcome! Is there anything else I can help with?",
    thank: "You're welcome! Is there anything else I can help with?",
    bye: "Goodbye! Feel free to come back anytime! 👋",
    goodbye: "Take care! Come back soon! 🎉",
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);

    // Simple bot response logic
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let response = "That's interesting! Can you tell me more?";

      for (const [key, value] of Object.entries(botResponses)) {
        if (lowerInput.includes(key)) {
          response = value;
          break;
        }
      }

      const botMessage: Message = { text: response, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);

    setInput("");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="win95-border p-3 bg-win95-lightGray">
        <h2 className="text-xl font-bold text-win95-blue">🤖 ChatBot</h2>
        <p className="text-xs text-gray-700">Ask me anything!</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-3 bg-white">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === "user"
                  ? "win95-border bg-blue-100"
                  : "win95-border bg-win95-lightGray"
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="win95-border p-2 bg-win95-gray flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          className="flex-1 win95-border-inset px-2 py-1"
        />
        <button onClick={handleSend} className="win95-button px-4 py-1 font-bold">
          Send
        </button>
      </div>
    </div>
  );
}
