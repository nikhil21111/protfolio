"use client";

import { AppData } from "@/lib/apps";
import Image from "next/image";

interface DesktopIconProps {
  app: AppData;
  onDoubleClick: () => void;
}

export default function DesktopIcon({ app, onDoubleClick }: DesktopIconProps) {
  const isImageIcon = app.icon.startsWith('/');
  
  return (
    <button
      onDoubleClick={onDoubleClick}
      className="flex flex-col items-center justify-center p-3 hover:bg-blue-900/30 rounded focus:outline-none focus:bg-blue-900/50 transition-colors group w-32"
      aria-label={`Open ${app.name}`}
    >
      <div className="w-20 h-20 mb-3 group-hover:scale-110 transition-transform flex items-center justify-center">
        {isImageIcon ? (
          <Image
            src={app.icon}
            alt={app.name}
            width={80}
            height={80}
            className="pixelated"
            style={{ imageRendering: 'pixelated' }}
          />
        ) : (
          <span className="text-7xl">{app.icon}</span>
        )}
      </div>
      <span className="text-white text-sm text-center font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,1)] bg-yellow-500 px-3 py-1 rounded">
        {app.name}
      </span>
    </button>
  );
}
