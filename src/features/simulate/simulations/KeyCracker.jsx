// src/features/simulate/simulations/KeyCracker.jsx
import React, { useState, useCallback } from 'react';

const ROUNDS = [
  {
    title: 'Apple Count',
    graphData: [
      { label: 'Apples',  symbols: '🍎🍎🍎🍎', count: 4 },
      { label: 'Bananas', symbols: '🍌🍌🍌', count: 3 },
      { label: 'Grapes',  symbols: '🍇🍇', count: 2 },
    ],
    key: 2,
    keyLabel: '1 picture = 2 votes',
    highlightRow: 'Apples',
    question: 'The key says 1 picture = 2 votes. How many REAL votes for Apples?',
    answer: 8,
    options: [4, 8, 6, 2],
    explanation: '4 pictures × 2 = 8 votes!',
  },
  {
    title: 'Pet Survey',
    graphData: [
      { label: 'Dogs', symbols: '🐶🐶🐶🐶🐶', count: 5 },
      { label: 'Cats', symbols: '🐱🐱🐱', count: 3 },
      { label: 'Fish', symbols: '🐟🐟🐟🐟', count: 4 },
    ],
    key: 3,
    keyLabel: '1 picture = 3 pets',
    highlightRow: 'Dogs',
    question: 'Key: 1 picture = 3 pets. How many dogs were counted?',
    answer: 15,
    options: [5, 15, 12, 8],
    explanation: '5 pictures × 3 = 15 dogs!',
  },
  {
    title: 'Colour Survey',
    graphData: [
      { label: 'Red',    symbols: '🔴🔴🔴', count: 3 },
      { label: 'Blue',   symbols: '🔵🔵🔵🔵🔵🔵', count: 6 },
      { label: 'Green',  symbols: '🟢🟢🟢🟢', count: 4 },
    ],
    key: 5,
    keyLabel: '1 picture = 5 votes',
    highlightRow: 'Blue',
    question: 'Key: 1 picture = 5 votes. How many votes did Blue get?',
    answer: 30,
    options: [6, 25, 30, 11],
    explanation: '6 pictures × 5 = 30 votes!',
  },
];

export default function KeyCracker({ onComplete }) {
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const r = ROUNDS[round];

  const handleSelect = useCallback((val) => {
    if (feedback) return;
    setSelected(val);

    if (val === r.answer) {
      setFeedback('correct');
      setScore((s) => s + 1);
      setTimeout(() => {
        if (round < ROUNDS.length - 1) {
          setRound((p) => p + 1);
          setSelected(null);
          setFeedback(null);
        } else {
          setDone(true);
        }
      }, 1200);
    } else {
      setFeedback('incorrect');
      setTimeout(() => {
        setSelected(null);
        setFeedback(null);
      }, 1000);
    }
  }, [feedback, r, round]);

  if (done) {
    return (
      <div className="sim-station" style={{ justifyContent: 'center', textAlign: 'center' }}>
        <span style={{ fontSize: '3rem' }}>🔑</span>
        <h3 className="sim-title">Key Cracker Complete!</h3>
        <p className="sim-prompt">You scored {score}/{ROUNDS.length}!</p>
        <button className="btn-primary" onClick={onComplete}>
          ✅ Mark Complete
        </button>
      </div>
    );
  }

  return (
    <div className="sim-station">
      <h3 className="sim-title">🔑 Key Cracker</h3>
      <span className="sim-round-label">Round {round + 1} / {ROUNDS.length} — {r.title}</span>

      {/* Pictograph display */}
      <div className="pictograph-card">
        <div className="pictograph-title">{r.title}</div>
        {r.graphData.map((row) => (
          <div key={row.label} className={`pictograph-row ${row.label === r.highlightRow ? 'highlight' : ''}`}>
            <span className="pictograph-row-label">{row.label}</span>
            <span className="pictograph-symbols">{row.symbols}</span>
          </div>
        ))}
        <div className="key-fact-box">
          <span className="key-value">{r.keyLabel}</span>
        </div>
      </div>

      {/* Question */}
      <p className="sim-prompt">{r.question}</p>

      {/* Options */}
      <div className="options-grid">
        {r.options.map((opt) => {
          let cls = 'option-btn';
          if (selected === opt && feedback === 'correct') cls += ' correct';
          else if (selected === opt && feedback === 'incorrect') cls += ' wrong';
          else if (selected === opt) cls += ' selected';
          return (
            <button key={opt} className={cls} onClick={() => handleSelect(opt)}>
              {opt}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`sim-feedback ${feedback}`}>
          {feedback === 'correct' ? `✅ ${r.explanation}` : '❌ Try again!'}
        </div>
      )}
    </div>
  );
}
