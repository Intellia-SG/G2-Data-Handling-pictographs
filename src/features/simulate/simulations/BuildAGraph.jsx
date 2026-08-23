// src/features/simulate/simulations/BuildAGraph.jsx
import React, { useState, useCallback } from 'react';

const ROUNDS = [
  {
    title: 'Fruit Votes',
    keyLabel: '1 picture = 2 votes',
    keyValue: 2,
    symbol: '⭐',
    rows: [
      { label: 'Apples',  target: 4 },
      { label: 'Bananas', target: 3 },
      { label: 'Grapes',  target: 2 },
    ],
    followUp: { question: 'Which fruit got the MOST votes?', answer: 'Apples', options: ['Apples', 'Bananas', 'Grapes'] },
  },
  {
    title: 'Sports Survey',
    keyLabel: '1 picture = 5 votes',
    keyValue: 5,
    symbol: '🏅',
    rows: [
      { label: 'Football', target: 3 },
      { label: 'Cricket',  target: 5 },
      { label: 'Tennis',   target: 2 },
    ],
    followUp: { question: 'How many total votes for Cricket?', answer: '25', options: ['25', '5', '15', '10'] },
  },
  {
    title: 'Pet Count',
    keyLabel: '1 picture = 3 pets',
    keyValue: 3,
    symbol: '🐾',
    rows: [
      { label: 'Dogs', target: 4 },
      { label: 'Cats', target: 2 },
      { label: 'Fish', target: 6 },
    ],
    followUp: { question: 'Which pet has the FEWEST?', answer: 'Cats', options: ['Dogs', 'Cats', 'Fish'] },
  },
];

export default function BuildAGraph({ onComplete }) {
  const [round, setRound] = useState(0);
  const [counts, setCounts] = useState({});
  const [phase, setPhase] = useState('build'); // 'build' | 'followup' | 'done'
  const [graphDone, setGraphDone] = useState(false);
  const [followSelected, setFollowSelected] = useState(null);
  const [followFeedback, setFollowFeedback] = useState(null);
  const [score, setScore] = useState(0);

  const r = ROUNDS[round];

  const getCount = (label) => counts[`${round}-${label}`] || 0;

  const setCount = (label, val) => {
    setCounts(prev => ({ ...prev, [`${round}-${label}`]: Math.max(0, val) }));
  };

  // Check if all rows match their targets
  const allMatched = r.rows.every(row => getCount(row.label) === row.target);

  const handleCheckGraph = useCallback(() => {
    if (allMatched) {
      setGraphDone(true);
      setPhase('followup');
    }
  }, [allMatched]);

  const handleFollowUp = useCallback((val) => {
    if (followFeedback) return;
    setFollowSelected(val);
    if (val === r.followUp.answer) {
      setFollowFeedback('correct');
      setScore(s => s + 1);
      setTimeout(() => {
        if (round < ROUNDS.length - 1) {
          setRound(p => p + 1);
          setPhase('build');
          setGraphDone(false);
          setFollowSelected(null);
          setFollowFeedback(null);
        } else {
          setPhase('done');
        }
      }, 1200);
    } else {
      setFollowFeedback('incorrect');
      setTimeout(() => {
        setFollowSelected(null);
        setFollowFeedback(null);
      }, 900);
    }
  }, [followFeedback, r, round]);

  if (phase === 'done') {
    return (
      <div className="sim-station" style={{ justifyContent: 'center', textAlign: 'center' }}>
        <span style={{ fontSize: '3rem' }}>📊</span>
        <h3 className="sim-title">Build-a-Graph Complete!</h3>
        <p className="sim-prompt">You scored {score}/{ROUNDS.length} follow-up questions!</p>
        <button className="btn-primary" onClick={onComplete}>✅ Mark Complete</button>
      </div>
    );
  }

  return (
    <div className="sim-station">
      <h3 className="sim-title">📊 Build a Graph</h3>
      <span className="sim-round-label">Round {round + 1} / {ROUNDS.length} — {r.title}</span>

      <div className="key-fact-box" style={{ width: '100%' }}>
        <span className="key-value">{r.keyLabel}</span>
      </div>

      {phase === 'build' ? (
        <>
          <p className="sim-prompt">
            Tap <strong>+</strong> to add {r.symbol} symbols until each row matches its target count.
          </p>

          <div className="pictograph-card">
            <div className="pictograph-title">{r.title}</div>
            {r.rows.map((row) => {
              const c = getCount(row.label);
              const matched = c === row.target;
              return (
                <div key={row.label} className={`pictograph-row ${matched ? 'highlight' : ''}`}
                  style={matched ? { background: 'rgba(34,197,94,0.12)', borderColor: 'var(--green)' } : {}}>
                  <span className="pictograph-row-label">{row.label}</span>
                  <span className="pictograph-symbols">
                    {Array.from({ length: c }, (_, i) => <span key={i}>{r.symbol}</span>)}
                  </span>
                  <span className="pictograph-row-total" style={{ color: matched ? '#4ade80' : 'var(--gold)' }}>
                    {c} / {row.target}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Controls */}
          {r.rows.map((row) => {
            const c = getCount(row.label);
            const matched = c === row.target;
            return (
              <div key={row.label} className="bag-row-controls" style={{ justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.88rem', minWidth: 72 }}>
                  {row.label}:
                </span>
                <button className="bag-count-btn" onClick={() => setCount(row.label, c - 1)} disabled={c <= 0 || matched}>
                  −
                </button>
                <span className="bag-current-count">{c}</span>
                <button className="bag-count-btn" onClick={() => setCount(row.label, c + 1)} disabled={matched}>
                  +
                </button>
                {matched && <span style={{ color: '#4ade80', fontWeight: 700 }}>✅</span>}
              </div>
            );
          })}

          <button className="btn-green" onClick={handleCheckGraph} disabled={!allMatched}>
            ✅ Check Graph
          </button>
        </>
      ) : (
        <>
          {/* Follow-up question */}
          <p className="sim-prompt">{r.followUp.question}</p>
          <div className="options-grid">
            {r.followUp.options.map((opt) => {
              let cls = 'option-btn';
              if (followSelected === opt && followFeedback === 'correct') cls += ' correct';
              else if (followSelected === opt && followFeedback === 'incorrect') cls += ' wrong';
              return (
                <button key={opt} className={cls} onClick={() => handleFollowUp(opt)}>
                  {opt}
                </button>
              );
            })}
          </div>
          {followFeedback && (
            <div className={`sim-feedback ${followFeedback}`}>
              {followFeedback === 'correct' ? '✅ Correct!' : '❌ Try again!'}
            </div>
          )}
        </>
      )}
    </div>
  );
}
