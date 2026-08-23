// src/features/simulate/simulations/SpotTheErrorStation.jsx
import React, { useState } from 'react';
import './Stations.css';
import { useAudio } from '../../../hooks/useAudio.js';

const ROUNDS = [
  {
    title: 'Fun Fair Fruit Stand',
    emoji: '🍎',
    keyLabel: '1 🍎 = 2 votes',
    keyValue: 2,
    rows: [
      { name: 'Apples', pictures: 4, claimedVotes: 8, isError: false },
      { name: 'Bananas', pictures: 3, claimedVotes: 3, isError: true, errorReason: 'Henry forgot the key! He counted 3 pictures instead of 3 × 2 = 6 votes.' },
      { name: 'Grapes', pictures: 2, claimedVotes: 4, isError: false },
    ],
    fixQuestion: 'Why is the Bananas row incorrect, and what should the real vote count be?',
    fixOptions: [
      '3 pictures × 2 (the key) = 6 votes, not 3!',
      'Bananas should only have 1 picture',
      'Apples has too many votes',
      'The key should be 1 🍎 = 1 vote',
    ],
    correctFixIndex: 0,
  },
  {
    title: 'Sports Day Ball Count',
    emoji: '⚽',
    keyLabel: '1 ⚽ = 5 balls',
    keyValue: 5,
    rows: [
      { name: 'Footballs', pictures: 4, claimedVotes: 20, isError: false },
      { name: 'Basketballs', pictures: 2, claimedVotes: 15, isError: true, errorReason: '2 pictures × 5 = 10 balls, not 15!' },
      { name: 'Tennis balls', pictures: 3, claimedVotes: 15, isError: false },
    ],
    fixQuestion: 'How many real basketballs do 2 picture symbols represent with a key of 5?',
    fixOptions: [
      '2 pictures × 5 = 10 balls (not 15)',
      '2 pictures × 5 = 7 balls',
      '2 pictures × 5 = 20 balls',
      'Basketballs has the most balls',
    ],
    correctFixIndex: 0,
  },
];

export default function SpotTheErrorStation({ onComplete, audioEnabled }) {
  const { sounds } = useAudio(audioEnabled);
  const [roundIdx, setRoundIdx] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedFix, setSelectedFix] = useState(null);
  const [fixed, setFixed] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const round = ROUNDS[roundIdx];

  function handleTapRow(rowName, isError) {
    sounds.click();
    setSelectedRow(rowName);
    if (isError) {
      sounds.badge();
      setFeedback({ type: 'correct', msg: '🔍 Glitch Spotted! Now select the correct fix below:' });
    } else {
      sounds.wrong();
      setFeedback({ type: 'wrong', msg: `This row is correct: ${rowName} has the right math. Look for the mistake in another row!` });
    }
  }

  function handleSelectFix(idx) {
    if (feedback?.type === 'fixed') return;
    setSelectedFix(idx);
    if (idx === round.correctFixIndex) {
      sounds.correct();
      setFixed(true);
      setFeedback({ type: 'correct', msg: '🎉 Glitch Fixed! Excellent math detective work.' });
      setTimeout(() => {
        if (roundIdx + 1 < ROUNDS.length) {
          setRoundIdx(prev => prev + 1);
          setSelectedRow(null);
          setSelectedFix(null);
          setFixed(false);
          setFeedback(null);
        } else {
          sounds.levelUp();
          onComplete?.();
        }
      }, 1500);
    } else {
      sounds.wrong();
      setFeedback({ type: 'wrong', msg: '❌ Not quite! Remember: Number of pictures × Key value.' });
      setTimeout(() => {
        setSelectedFix(null);
      }, 1200);
    }
  }

  const errorRow = round.rows.find(r => r.isError);

  return (
    <div className="sim-station-container">
      <div className="sim-station-header">
        <h3 className="sim-station-title">🔍 Station D: Spot the Graph Glitch</h3>
        <span className="sim-station-round">Round {roundIdx + 1} / {ROUNDS.length}</span>
      </div>

      <div className="sim-prompt-box">
        {!selectedRow || selectedRow !== errorRow.name
          ? 'Tap on the row with the counting or key calculation mistake!'
          : round.fixQuestion}
      </div>

      {/* Pictograph with interactive row error spotting */}
      <div className="pictograph-card">
        <div className="pictograph-title">{round.title}</div>
        <div className="error-graph-box">
          {round.rows.map((row) => {
            const isSelected = selectedRow === row.name;
            const isTargetError = row.isError;
            let rowCls = 'pictograph-row error-row-clickable';
            if (isSelected && isTargetError) rowCls += fixed ? ' fixed' : ' selected-error';

            return (
              <div
                key={row.name}
                className={rowCls}
                onClick={() => handleTapRow(row.name, isTargetError)}
              >
                <span className="pictograph-row-label">{row.name}</span>
                <span className="pictograph-symbols">
                  {Array.from({ length: row.pictures }).map((_, i) => (
                    <span key={i}>{round.emoji}</span>
                  ))}
                </span>
                <span
                  className="pictograph-row-total"
                  style={{ color: (isSelected && isTargetError && !fixed) ? '#ef5350' : 'var(--gold)' }}
                >
                  {fixed && isTargetError
                    ? `${row.pictures * round.keyValue} votes ✓`
                    : `${row.claimedVotes} votes`}
                </span>
              </div>
            );
          })}
        </div>

        <div className="key-fact-box">
          <span className="key-value">🔑 Key: 1 {round.emoji} = {round.keyValue}</span>
        </div>
      </div>

      {/* Fix Question Choices */}
      {selectedRow === errorRow.name && (
        <div style={{ width: '100%' }}>
          <div className="options-grid">
            {round.fixOptions.map((opt, i) => {
              let cls = 'option-btn';
              if (selectedFix === i && fixed) cls += ' correct';
              else if (selectedFix === i && !fixed) cls += ' wrong';
              return (
                <button key={i} className={cls} onClick={() => handleSelectFix(i)}>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {feedback && (
        <div className={`sim-feedback-banner ${feedback.type}`}>
          {feedback.msg}
        </div>
      )}
    </div>
  );
}
