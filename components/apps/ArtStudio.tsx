"use client";

import { useState, useRef, useEffect } from "react";

const tools = [
  { id: "brush", name: "Brush", icon: "🖌️", cursor: "crosshair" },
  { id: "pencil", name: "Pencil", icon: "✏️", cursor: "crosshair" },
  { id: "eraser", name: "Eraser", icon: "🧹", cursor: "crosshair" },
  { id: "fill", name: "Fill", icon: "🪣", cursor: "pointer" },
  { id: "picker", name: "Color Picker", icon: "�", cursor: "pointer" },
];

const colors = [
  "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF",
  "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#800080",
  "#A52A2A", "#808080", "#FFC0CB", "#FFD700", "#4B0082",
];

const brushSizes = [2, 5, 10, 15, 20];

export default function ArtStudio() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedTool, setSelectedTool] = useState("brush");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize canvas with white background
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setLastPos({ x, y });

    if (selectedTool === "fill") {
      floodFill(x, y);
    } else if (selectedTool === "picker") {
      pickColor(x, y);
    } else {
      setIsDrawing(true);
      draw(x, y, x, y);
    }
  };

  const draw = (x0: number, y0: number, x1: number, y1: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (selectedTool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = brushSize * 2;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = selectedTool === "pencil" ? brushSize / 2 : brushSize;
    }

    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
  };

  const continueDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    draw(lastPos.x, lastPos.y, x, y);
    setLastPos({ x, y });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const floodFill = (startX: number, startY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const startPos = (Math.floor(startY) * canvas.width + Math.floor(startX)) * 4;
    const startR = data[startPos];
    const startG = data[startPos + 1];
    const startB = data[startPos + 2];

    const fillColor = hexToRgb(selectedColor);
    if (!fillColor) return;

    // Don't fill if clicking on same color
    if (startR === fillColor.r && startG === fillColor.g && startB === fillColor.b) return;

    const pixelStack: [number, number][] = [[Math.floor(startX), Math.floor(startY)]];

    while (pixelStack.length > 0) {
      const [x, y] = pixelStack.pop()!;
      if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) continue;

      const pos = (y * canvas.width + x) * 4;
      if (
        data[pos] === startR &&
        data[pos + 1] === startG &&
        data[pos + 2] === startB
      ) {
        data[pos] = fillColor.r;
        data[pos + 1] = fillColor.g;
        data[pos + 2] = fillColor.b;
        data[pos + 3] = 255;

        pixelStack.push([x + 1, y]);
        pixelStack.push([x - 1, y]);
        pixelStack.push([x, y + 1]);
        pixelStack.push([x, y - 1]);
      }
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const pickColor = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1);
    const data = imageData.data;
    const hex = rgbToHex(data[0], data[1], data[2]);
    setSelectedColor(hex);
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "art-studio-creation.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="h-full flex flex-col bg-win95-lightGray">
      {/* Menu Bar */}
      <div className="win95-border bg-win95-gray flex text-xs">
        <button className="px-3 py-1 hover:bg-win95-blue hover:text-white">File</button>
        <button className="px-3 py-1 hover:bg-win95-blue hover:text-white">Edit</button>
        <button className="px-3 py-1 hover:bg-win95-blue hover:text-white">View</button>
        <button className="px-3 py-1 hover:bg-win95-blue hover:text-white">Image</button>
      </div>

      {/* Toolbar */}
      <div className="win95-border p-2 bg-win95-gray flex items-center space-x-4 flex-wrap gap-2">
        {/* Tools */}
        <div className="flex space-x-1">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className={`win95-button w-10 h-10 text-xl transition-all hover:scale-110 ${
                selectedTool === tool.id ? "win95-border-inset bg-gray-300" : ""
              }`}
              title={tool.name}
            >
              {tool.icon}
            </button>
          ))}
        </div>

        <div className="h-8 w-px bg-gray-600" />

        {/* Brush Size */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold">Size:</span>
          <select
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="win95-border-inset px-2 py-1 text-xs"
          >
            {brushSizes.map((size) => (
              <option key={size} value={size}>
                {size}px
              </option>
            ))}
          </select>
        </div>

        <div className="h-8 w-px bg-gray-600" />

        {/* Color Palette */}
        <div className="flex flex-wrap gap-1 max-w-md">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-6 h-6 win95-border transition-all hover:scale-110 ${
                selectedColor === color ? "ring-2 ring-blue-600 scale-110" : ""
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>

        <div className="h-8 w-px bg-gray-600" />

        {/* Custom Color Input */}
        <div className="flex items-center space-x-2">
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-8 h-8 win95-border cursor-pointer"
            title="Custom Color"
          />
        </div>

        <div className="h-8 w-px bg-gray-600" />

        {/* Action Buttons */}
        <button
          onClick={clearCanvas}
          className="win95-button px-3 py-1 text-xs hover:bg-red-100"
        >
          🗑️ Clear
        </button>
        <button
          onClick={downloadImage}
          className="win95-button px-3 py-1 text-xs hover:bg-green-100"
        >
          💾 Save
        </button>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="win95-border-inset bg-white inline-block">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            onMouseDown={startDrawing}
            onMouseMove={continueDrawing}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="block"
            style={{ 
              cursor: tools.find(t => t.id === selectedTool)?.cursor || "default",
              imageRendering: "pixelated"
            }}
          />
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="win95-border-inset px-2 py-1 bg-win95-gray text-xs flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Ready
          </span>
          <span>Canvas: 800x600</span>
          <span>Tool: {tools.find(t => t.id === selectedTool)?.name}</span>
          <span>Size: {brushSize}px</span>
          <span className="flex items-center gap-1">
            Color: 
            <span 
              className="inline-block w-4 h-4 border border-black ml-1"
              style={{ backgroundColor: selectedColor }}
            ></span>
            {selectedColor}
          </span>
        </div>
      </div>
    </div>
  );
}
