// src/utils/scoring.js
// XP and star calculation matching reference module pattern

export function calcXP(attemptCount = 1, hintsUsed = 0, streak = 0) {
  let xp = 10; // base
  if (attemptCount > 1) xp = Math.max(3, xp - (attemptCount - 1) * 2);
  if (hintsUsed > 0) xp = Math.max(2, xp - hintsUsed * 2);
  if (streak >= 3) xp += 3;
  if (streak >= 5) xp += 5;
  if (streak >= 10) xp += 10;
  return xp;
}

export function calcStars(correctCount, totalPerDistrict = 10) {
  const pct = totalPerDistrict > 0 ? correctCount / totalPerDistrict : 0;
  if (pct >= 0.9) return 3;
  if (pct >= 0.7) return 2;
  if (pct >= 0.5) return 1;
  return 0;
}
