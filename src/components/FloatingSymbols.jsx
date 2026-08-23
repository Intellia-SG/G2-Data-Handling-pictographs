// src/components/FloatingSymbols.jsx
import React from 'react';
import './FloatingSymbols.css';

const PICTO_SYMBOLS = [
  '🍎 : 2', '🍌 : 5', '🔑 1 = 2', '🍇 : 4', '📊', '🐶 : 3',
  '⚽ : 4', '✏️ : 10', '⭐ : 2', '1 🐾 = 5', '🍦 : 2', '🚗 : 10',
  '📚 : 3', '🎨 : 5', 'Total: 20', '📈', '🔑 Key'
];

export default function FloatingSymbols() {
  return (
    <div className="floating-symbols-container" aria-hidden="true">
      {PICTO_SYMBOLS.map((symbol, idx) => (
        <span
          key={idx}
          className="floating-symbol"
          style={{
            left: `${((idx * 6.3) + 3) % 94}%`,
            top: `${((idx * 7.7) + 5) % 90}%`,
            animationDelay: `${idx * 1.3}s`,
            animationDuration: `${18 + (idx % 5) * 4}s`,
            fontSize: `${1.3 + (idx % 3) * 0.4}rem`,
          }}
        >
          {symbol}
        </span>
      ))}
    </div>
  );
}
