// src/features/reflect/ReflectPhase.jsx
import React, { useState, useEffect, useRef } from 'react';
import './ReflectPhase.css';
import Mascot from '../../components/shared/Mascot.jsx';
import { BADGES } from '../../utils/badgeEngine.js';
import { calcStars } from '../../utils/scoring.js';
import { useAudio } from '../../hooks/useAudio.js';
import { reflectNarration, reflectCompleteNarration } from '../../utils/narration.js';
import { generateSessionQuestions } from '../../utils/shuffle.js';
import questionBank from '../../data/questionBank.js';

const REFLECT_QUESTIONS = [
  {
    q: "1. Pencil Factory: The key is 1 ✏️ = 10 pencils. If the Blue row has 5 pictures, how many real pencils were produced?",
    options: [
      "5 pictures × 10 = 50 pencils",
      "5 + 10 = 15 pencils",
      "Just 5 pencils",
    ],
    correct: 0,
  },
  {
    q: "2. Fruit Stand: Apples has 4 pictures and Bananas has 3 pictures (Key: 1 🍎 = 2 votes). How many MORE votes did Apples get?",
    options: [
      "8 votes - 6 votes = 2 more votes",
      "4 - 3 = 1 vote",
      "8 + 6 = 14 votes",
    ],
    correct: 0,
  },
  {
    q: "3. Golden Graph Rule: What should you ALWAYS check first before counting any picture graph?",
    options: [
      "The Key (it tells how much each picture stands for)",
      "The color of the background",
      "The size of the picture icons",
    ],
    correct: 0,
  },
];

export default function ReflectPhase({ state, dispatch }) {
  const [answers, setAnswers]     = useState({});
  const [journal, setJournal]     = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { narrate, stopAll, sounds } = useAudio(state.audioEnabled);
  const narrated = useRef(false);

  const totalCorrect = state.districtCorrect?.reduce((s, c) => s + (c || 0), 0) || 0;
  const totalStars   = state.districtScores?.reduce((s, sc) => {
    if (sc === null) return s;
    return s + calcStars(sc);
  }, 0) || 0;

  useEffect(() => {
    if (!narrated.current) {
      narrated.current = true;
      narrate(reflectNarration());
    }
    dispatch({ type: 'COMPLETE_PHASE', payload: 'reflect' });
    return () => stopAll();
  }, [dispatch, narrate, stopAll]);

  function handleSelectOption(qIdx, optIdx) {
    sounds.click();
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  }

  function handleSubmit() {
    setSubmitted(true);
    stopAll();
    sounds.badge();
    narrate(reflectCompleteNarration());
  }

  function playAgain() {
    dispatch({ type: 'RESET_SESSION' });
    dispatch({ type: 'LOAD_QUESTIONS', payload: generateSessionQuestions(questionBank) });
    dispatch({ type: 'SET_PHASE', payload: 'intro' });
  }

  const earnedBadges = BADGES.filter(b => state.badges.includes(b.id));

  if (submitted) {
    return (
      <div className="reflect-wrap">
        <div className="trophy-card glass-card anim-bounce-in">
          <div className="trophy-icon">🏆</div>
          <h1 className="trophy-title headline">You're a Picture Graph Pro!</h1>
          <p className="trophy-sub subheadline" style={{ color: 'var(--gold)' }}>
            Reading Pictographs Mastery Complete ✅
          </p>

          {/* Stats Breakdown */}
          <div className="trophy-stats">
            <div className="trophy-stat">
              <span className="stat-value number-display">{totalCorrect}</span>
              <span className="stat-label label-text">/ 100 Questions</span>
            </div>
            <div className="trophy-stat">
              <span className="stat-value number-display">{state.xp}</span>
              <span className="stat-label label-text">XP Earned ⭐</span>
            </div>
            <div className="trophy-stat">
              <span className="stat-value number-display">{state.maxStreak}</span>
              <span className="stat-label label-text">Best Streak 🔥</span>
            </div>
          </div>

          {/* Stars */}
          <div className="trophy-stars">
            {[...Array(Math.min(Math.max(totalStars, 3), 30))].map((_, i) => (
              <span key={i} style={{ fontSize: '1.2rem', animationDelay: `${i * 0.05}s` }} className="anim-bounce-in">
                ⭐
              </span>
            ))}
          </div>

          {/* Badges */}
          {earnedBadges.length > 0 && (
            <div className="trophy-badges">
              <p className="label-text" style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '6px' }}>
                Badges Unlocked
              </p>
              <div className="badge-list">
                {earnedBadges.map(b => (
                  <div key={b.id} className="badge-pill">
                    <span style={{ fontSize: '1.2rem' }}>{b.icon}</span>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <span style={{ fontWeight: 800 }}>{b.label}</span>
                      <span className="badge-desc label-text">{b.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="trophy-actions">
            <button className="btn-primary trophy-cta" onClick={playAgain}>
              🔄 Play Again
            </button>
            <button className="btn-outline" onClick={() => dispatch({ type: 'SET_PHASE', payload: 'intro' })}>
              🏠 Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reflect-wrap">
      <div className="reflect-card glass-card anim-slide-up">
        <div className="reflect-header">
          <span className="reflect-badge">📓 Learning Reflection & Scorecard</span>
          <h2 className="reflect-title subheadline">Reflect on Your Pictograph Journey</h2>
        </div>

        <Mascot mood="curious" message="Let's check your key takeaways and review your scorecard!" size="sm" />

        {/* Self-assessment Concept Check */}
        <div className="reflect-quiz-container">
          <p className="body-text" style={{ color: 'var(--gold)', fontWeight: 800 }}>
            🧠 Concept Reflection Check:
          </p>
          {REFLECT_QUESTIONS.map((qObj, qIdx) => (
            <div key={qIdx} className="reflect-q-item">
              <p className="reflect-q-text">{qObj.q}</p>
              <div className="reflect-opt-row">
                {qObj.options.map((opt, oIdx) => {
                  const isSelected = answers[qIdx] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      className={`reflect-opt-btn ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSelectOption(qIdx, oIdx)}
                    >
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Journal Entry */}
        <div className="reflect-journal">
          <label className="reflect-label body-text" htmlFor="journal-input">
            Write one pictograph rule or formula you mastered:
          </label>
          <textarea
            id="journal-input"
            className="reflect-textarea"
            placeholder="e.g. 4 Pictures × 2 (Key) = 8 Votes!"
            value={journal}
            onChange={e => setJournal(e.target.value)}
            rows={2}
            aria-label="Learning journal entry"
          />

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
            <span style={{ fontSize: '0.8rem', color: '#a0a0b8', alignSelf: 'center' }}>Quick insert:</span>
            {[
              'Pictures × Key = Real Total',
              '1 Picture = 5 Votes ➔ 4 Pics = 20 Votes',
              'Always check the Key before counting!',
            ].map(ex => (
              <button
                key={ex}
                type="button"
                onClick={() => setJournal(ex)}
                className="quick-insert-btn"
              >
                ✨ {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Performance Snapshot */}
        <div className="reflect-stats">
          <div className="reflect-stat-pill">⭐ {state.xp} XP Earned</div>
          <div className="reflect-stat-pill">✅ {totalCorrect}/100 Correct</div>
          <div className="reflect-stat-pill">🔥 Best Streak: {state.maxStreak}</div>
        </div>

        <div className="reflect-actions">
          <button className="btn-primary" onClick={handleSubmit}>
            🌟 Submit Reflection & View Trophy Scorecard!
          </button>
        </div>
      </div>
    </div>
  );
}
