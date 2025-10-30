"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trails, setTrails] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Add trail effect
      const newTrail = { x: e.clientX, y: e.clientY, id: trailId++ };
      setTrails((prev) => [...prev.slice(-8), newTrail]);

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.tagName === "BUTTON" || 
                           target.tagName === "A" || 
                           target.closest("button") !== null ||
                           target.closest("a") !== null ||
                           target.classList.contains("win95-button");
      setIsHovering(isInteractive);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Main Cursor */}
      <div
        className={`custom-cursor ${isHovering ? "hovering" : ""} ${isClicking ? "clicking" : ""}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <div className="cursor-dot"></div>
        <div className="cursor-outline"></div>
      </div>

      {/* Cursor Trails */}
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: `${trail.x}px`,
            top: `${trail.y}px`,
            opacity: (index + 1) / trails.length * 0.5,
            transform: `translate(-50%, -50%) scale(${(index + 1) / trails.length})`,
            transition: "opacity 0.3s, transform 0.3s",
          }}
        />
      ))}
    </>
  );
}
