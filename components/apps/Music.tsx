"use client";

import { useState } from "react";

export default function Music() {
  const [isPlaying, setIsPlaying] = useState(false);

  const tracks = [
    { id: 1, name: "Lofi Beats", duration: "3:24" },
    { id: 2, name: "Retro Synth", duration: "4:12" },
    { id: 3, name: "Chill Vibes", duration: "2:58" },
    { id: 4, name: "Pixel Dreams", duration: "3:45" },
  ];

  return (
    <div className="p-6 space-y-4 h-full bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="win95-border p-4 bg-win95-lightGray text-center">
        <h2 className="text-xl font-bold mb-2 text-win95-blue">💿 Music Player</h2>
        <p className="text-xs text-gray-700">Retro tunes for coding</p>
      </div>

      {/* Vinyl Record */}
      <div className="flex justify-center">
        <div className={`relative ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "3s" }}>
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-yellow-100"></div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="win95-border p-4 bg-white">
        <div className="flex justify-center space-x-2 mb-3">
          <button className="win95-button px-4 py-2">⏮️</button>
          <button 
            className="win95-button px-4 py-2"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? "⏸️" : "▶️"}
          </button>
          <button className="win95-button px-4 py-2">⏭️</button>
        </div>
        <div className="win95-border-inset p-2 bg-win95-lightGray text-center text-xs">
          Now Playing: {isPlaying ? "Lofi Beats" : "Paused"}
        </div>
      </div>

      {/* Playlist */}
      <div className="win95-border p-3 bg-white">
        <h3 className="font-bold text-sm mb-2">Playlist:</h3>
        <div className="space-y-1">
          {tracks.map((track, index) => (
            <div key={track.id} className={`win95-border-inset p-2 text-xs flex justify-between ${index === 0 ? 'bg-blue-100' : 'bg-win95-lightGray'}`}>
              <span>{track.name}</span>
              <span className="text-gray-600">{track.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
