"use client";

import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  currency: string;
  icon: string;
  description: string;
}

const products: Product[] = [
  { id: 1, name: "Machine Learning", price: 0, currency: "PASSION", icon: "�", description: "AI-powered solutions" },
  { id: 2, name: "Web3 Curiosity", price: 0, currency: "PASSION", icon: "�", description: "Blockchain exploration" },
  { id: 3, name: "Debugging Snacks", price: 0, currency: "PASSION", icon: "🐛", description: "Essential fuel" },
];

export default function MiniMarket() {
  const [purchased, setPurchased] = useState<number[]>([1, 2, 3]);

  return (
    <div className="h-full flex flex-col bg-yellow-50">
      {/* Header */}
      <div className="p-3 bg-yellow-100 border-b-2 border-yellow-300">
        <h2 className="text-sm font-bold text-center">🛒 NIK&apos;S MINI-MARKET</h2>
      </div>

      <div className="flex-1 p-3">
        <p className="text-xs font-bold mb-2 underline">ITEMS PURCHASED</p>
        <div className="space-y-1 mb-3">
          {products.map((product) => (
            <label key={product.id} className="flex items-start space-x-2 text-xs">
              <input
                type="checkbox"
                checked={purchased.includes(product.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setPurchased([...purchased, product.id]);
                  } else {
                    setPurchased(purchased.filter(id => id !== product.id));
                  }
                }}
                className="mt-1"
              />
              <span>
                {product.name} ${product.price.toFixed(2)}
              </span>
            </label>
          ))}
        </div>

        <div className="border-t border-gray-400 pt-2 mb-3">
          <p className="text-xs font-bold text-right">TOTAL ........ PASSION</p>
        </div>

        <div className="text-center">
          <p className="text-xs italic text-gray-600 mb-2">&quot;Keep learning, keep coding.&quot;</p>
          <p className="text-xs font-bold">*CODE RECEIPT</p>
        </div>
      </div>
    </div>
  );
}
