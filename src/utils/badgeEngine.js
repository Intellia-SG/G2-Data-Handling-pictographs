// src/utils/badgeEngine.js
// Badge definitions and check logic for PictoQuest

export const BADGES = [
  { id: 'first_answer', icon: '📊', label: 'First Graph',      description: 'Answered your first pictograph question' },
  { id: 'key_master',   icon: '🔑', label: 'Key Master',       description: '5 correct answers in a row' },
  { id: 'sim_explorer', icon: '🧪', label: 'Lab Explorer',     description: 'Completed all simulation stations' },
  { id: 'streak_5',     icon: '🔥', label: 'On Fire',          description: 'Achieved a 5-question streak' },
  { id: 'streak_10',    icon: '💥', label: 'Unstoppable',      description: 'Achieved a 10-question streak' },
  { id: 'boss_slayer',  icon: '👑', label: 'Boss Slayer',      description: 'Defeated a district boss' },
  { id: 'half_done',    icon: '⭐', label: 'Halfway Hero',     description: 'Completed 50 questions' },
  { id: 'all_done',     icon: '🏆', label: 'Picto Grand Master', description: 'Completed all 100 questions' },
];

export function checkBadges(state) {
  const earned = [];
  const total = state.districtCorrect?.reduce((s, c) => s + (c || 0), 0) || 0;

  if (total > 0 && !state.badges.includes('first_answer')) earned.push('first_answer');
  if (state.maxStreak >= 5 && !state.badges.includes('key_master')) earned.push('key_master');
  if (state.maxStreak >= 5 && !state.badges.includes('streak_5')) earned.push('streak_5');
  if (state.maxStreak >= 10 && !state.badges.includes('streak_10')) earned.push('streak_10');
  if (state.simStationsComplete?.every(Boolean) && !state.badges.includes('sim_explorer')) earned.push('sim_explorer');
  if (state.currentQuestion >= 50 && !state.badges.includes('half_done')) earned.push('half_done');
  if (state.currentQuestion >= 100 && !state.badges.includes('all_done')) earned.push('all_done');

  return earned;
}
