// src/features/simulate/simulations/ScaleDetectiveStation.jsx
import React, { useState } from 'react';
import './Stations.css';
import { useAudio } from '../../../hooks/useAudio.js';

const ROUNDS = [
  {
    title: 'Secret Ice Cream Vault',
    emoji: '🍦',
    knownRow: { name: 'Vanilla', pictures: 4, realVotes: 20 },
    mysteryRow: { name: 'Chocolate', pictures: 6 },
    clue: 'Clue: 4 Vanilla pictures = 20 scoops sold. What is the value of 1 picture?',
    keyOptions: [2, 4, 5, 10],
    correctKey: 5,
    deductionQuestion: 'Now that you know 1 🍦 = 5 scoops, how many scoops of Chocolate were sold (6 pictures)?',
    deductionOptions: ['30 scoops', '24 scoops', '35 scoops', '11 scoops'],
    correctDeductionIndex: 0,
    explanation: '6 pictures × 5 scoops = 30 scoops!',
  },
  {
    title: 'Transport Depot Mystery',
    emoji: '🚗',
    knownRow: { name: 'Cars', pictures: 5, realVotes: 50 },
    mysteryRow: { name: 'Buses', pictures: 3 },
    clue: 'Clue: 5 Car pictures = 50 vehicles recorded. What is the key?',
    keyOptions: [5, 10, 20, 2],
    correctKey: 10,
    deductionQuestion: 'With 1 🚗 = 10 vehicles, how many buses were counted for 3 pictures?',
    deductionOptions: ['30 vehicles', '13 vehicles', '300 vehicles', '15 vehicles'],
    correctDeductionIndex: 0,
    explanation: '3 pictures × 10 vehicles = 30 vehicles!',
  },
];

export default function ScaleDetectiveStation({ onComplete, audioEnabled }) {
  const { sounds } = useAudio(audioEnabled);
  const [roundIdx, setRoundIdx] = useState(0);
  const [crackedKey, setCrackedKey] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);
  const [selectedDeduction, setSelectedDeduction] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const round = ROUNDS[roundIdx];

  function handleCrackKey(k) {
    if (feedback) return;
    setSelectedKey(k);
    if (k === round.correctKey) {
      sounds.badge();
      setCrackedKey(k);
      setFeedback({ type: 'correct', msg: `🔑 Case Cracked! 1 ${round.emoji} = ${k}. Now solve the mystery count!` });
      setTimeout(() => setFeedback(null), 1200);
    } else {
      sounds.wrong();
      setFeedback({ type: 'wrong', msg: `❌ Not quite! Divide: ${round.knownRow.realVotes} ÷ ${round.knownRow.pictures} pictures = ?` });
      setTimeout(() => {
        setSelectedKey(null);
        setFeedback(null);
      }, 1200);
    }
  }

  function handleAnswerDeduction(optIdx) {
    if (feedback) return;
    setSelectedDeduction(optIdx);
    if (optIdx === round.correctDeductionIndex) {
      sounds.correct();
      setFeedback({ type: 'correct', msg: `✅ ${round.explanation}` });
      setTimeout(() => {
        if (roundIdx + 1 < ROUNDS.length) {
          setRoundIdx(prev => prev + 1);
          setCrackedKey(null);
          setSelectedKey(null);
          setSelectedDeduction(null);
          setFeedback(null);
        } else {
          sounds.levelUp();
          onComplete?.();
        }
      }, 1400);
    } else {
      sounds.wrong();
      setFeedback({ type: 'wrong', msg: '❌ Check: Pictures in row × Key value.' });
      setTimeout(() => {
        setSelectedDeduction(null);
        setFeedback(null);
      }, 1200);
    }
  }

  return (
    <div className="sim-station-container">
      <div className="sim-station-header">
        <h3 className="sim-station-title">🔍 Station C: Scale Detective</h3>
        <span className="sim-station-round">Round {roundIdx + 1} / {ROUNDS.length}</span>
      </div>

      {/* Clue Banner */}
      <div className="clue-banner">
        <span className="clue-icon">🔎</span>
        <span>{round.clue}</span>
      </div>

      {/* Detective Pictograph Display */}
      <div className="pictograph-card">
        <div className="pictograph-title">{round.title}</div>

        {/* Known Row */}
        <div className="pictograph-row highlight">
          <span className="pictograph-row-label">{round.knownRow.name}</span>
          <span className="pictograph-symbols">
            {Array.from({ length: round.knownRow.pictures }).map((_, i) => (
              <span key={i}>{round.emoji}</span>
            ))}
          </span>
          <span className="pictograph-row-total">{round.knownRow.realVotes} total</span>
        </div>

        {/* Mystery Row */}
        <div className="pictograph-row" style={{ borderStyle: 'dashed' }}>
          <span className="pictograph-row-label">{round.mysteryRow.name}</span>
          <span className="pictograph-symbols">
            {Array.from({ length: round.mysteryRow.pictures }).map((_, i) => (
              <span key={i}>{round.emoji}</span>
            ))}
          </span>
          <span className="pictograph-row-total" style={{ color: crackedKey ? '#4ade80' : '#f59e0b' }}>
            {crackedKey ? `${round.mysteryRow.pictures * crackedKey} votes` : '🔒 ???'}
          </span>
        </div>

        <div className="key-fact-box">
          <span className="key-value">
            {crackedKey ? `🔓 UNLOCKED: 1 ${round.emoji} = ${crackedKey}` : `🔒 Key is Unknown!`}
          </span>
        </div>
      </div>

      {/* Stage 1: Key selection */}
      {!crackedKey && (
        <div style={{ width: '100%', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.92rem', marginBottom: 6 }}>
            Tap the correct Key value:
          </p>
          <div className="options-grid">
            {round.keyOptions.map((k) => (
              <button
                key={k}
                className={`option-btn ${selectedKey === k ? 'selected' : ''}`}
                onClick={() => handleCrackKey(k)}
              >
                1 {round.emoji} = {k}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Stage 2: Mystery deduction question */}
      {crackedKey && (
        <div style={{ width: '100%', textAlign: 'center' }}>
          <p className="sim-prompt-box">
            {round.deductionQuestion}
          </p>
          <div className="options-grid" style={{ marginTop: 6 }}>
            {round.deductionOptions.map((opt, i) => {
              let cls = 'option-btn';
              if (selectedDeduction === i && feedback?.type === 'correct') cls += ' correct';
              else if (selectedDeduction === i && feedback?.type === 'wrong') cls += ' wrong';
              return (
                <button key={i} className={cls} onClick={() => handleAnswerDeduction(i)}>
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
