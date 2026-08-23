// src/utils/shuffle.js
// Session question shuffling utility

export function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Generate a shuffled session of 100 questions from the question bank.
 * Each district of 10 questions is internally shuffled but stays grouped.
 */
export function generateSessionQuestions(allQuestions) {
  if (!allQuestions || allQuestions.length === 0) return [];
  // Group by districtId
  const districts = {};
  allQuestions.forEach(q => {
    const d = q.districtId ?? 0;
    if (!districts[d]) districts[d] = [];
    districts[d].push(q);
  });

  const result = [];
  const districtKeys = Object.keys(districts).sort((a, b) => Number(a) - Number(b));
  for (const key of districtKeys) {
    result.push(...shuffleArray(districts[key]));
  }
  return result;
}
