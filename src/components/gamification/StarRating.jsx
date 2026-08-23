// src/components/gamification/StarRating.jsx
import React from 'react';

export default function StarRating({ stars = 0, maxStars = 3, size = 'md' }) {
  const fontSize = size === 'sm' ? '0.85rem' : size === 'lg' ? '1.5rem' : '1.1rem';

  return (
    <div style={{ display: 'inline-flex', gap: '2px', fontSize, lineHeight: 1 }} aria-label={`${stars} out of ${maxStars} stars`}>
      {Array.from({ length: maxStars }).map((_, i) => (
        <span key={i} style={{ opacity: i < stars ? 1 : 0.25, filter: i < stars ? 'drop-shadow(0 0 4px rgba(255,193,7,0.6))' : 'none' }}>
          ⭐
        </span>
      ))}
    </div>
  );
}
