// src/features/simulate/simulations/KeyScalerStation.jsx
import React, { useState } from 'react';
import './Stations.css';
import { useAudio } from '../../../hooks/useAudio.js';

const SCALES = [1, 2, 5, 10];

const ROUNDS = [
  {
    title: 'Fruit Harvest Survey',
    emoji: '🍎',
    targetData: [
      { name: 'Apples',  realVotes: 10 },
      { name: 'Bananas', realVotes: 20 },
      { name: 'Grapes',  realVotes: 15 },
    ],
    taskPrompt: 'Select a Key so that Bananas (20 votes) can be shown with exactly 4 pictures!',
    requiredKey: 5,
    followUp: {
      question: 'With a key of 1 🍎 = 5 votes, how many pictures are needed for Apples (10 votes)?',
      options: ['2 pictures', '5 pictures', '10 pictures', '4 pictures'],
      correctIndex: 0,
      explanation: '10 ÷ 5 = 2 pictures!',
    },
  },
  {
    title: 'Sports Day Voters',
    emoji: '⚽',
    targetData: [
      { name: 'Football', realVotes: 8 },
      { name: 'Cricket',  realVotes: 12 },
      { name: 'Tennis',   realVotes: 4 },
    ],
    taskPrompt: 'Select a Key so that Cricket (12 votes) is shown with exactly 6 pictures!',
    requiredKey: 2,
    followUp: {
      question: 'With a key of 1 ⚽ = 2 votes, how many total pictures are there across all 3 sports?',
      options: ['12 pictures', '24 pictures', '6 pictures', '10 pictures'],
      correctIndex: 0,
      explanation: '(8 + 12 + 4) = 24 votes ÷ 2 = 12 pictures in total!',
    },
  },
  {
    title: 'Pencil Factory Output',
    emoji: '✏️',
    targetData: [
      { name: 'Red',    realVotes: 40 },
      { name: 'Blue',   realVotes: 60 },
      { name: 'Yellow', realVotes: 30 },
    ],
    taskPrompt: 'Select a Key so that Blue (60 pencils) is shown with exactly 6 pictures!',
    requiredKey: 10,
    followUp: {
      question: 'With a key of 1 ✏️ = 10 pencils, what is the total number of pencils for Red + Yellow?',
      options: ['70 pencils', '7 pencils', '40 pencils', '50 pencils'],
      correctIndex: 0,
      explanation: '40 + 30 = 70 pencils (7 pictures × 10)!',
    },
  },
];

export default function KeyScalerStation({ onComplete, audioEnabled }) {
  const { sounds } = useAudio(audioEnabled);
  const [roundIdx, setRoundIdx] = useState(0);
  const [currentKey, setCurrentKey] = useState(2);
  const [stage, setStage] = useState('scale'); // 'scale' | 'question' | 'roundDone'
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const round = ROUNDS[roundIdx];

  function handleSelectKey(k) {
    sounds.click();
    setCurrentKey(k);
    if (k === round.requiredKey && stage === 'scale') {
      sounds.correct();
      setFeedback({ type: 'correct', msg: `Great choice! Key: 1 ${round.emoji} = ${k} matches the target!` });
      setTimeout(() => {
        setStage('question');
        setFeedback(null);
      }, 1100);
    }
  }

  function handleAnswerQuestion(optIdx) {
    if (feedback) return;
    setSelectedOpt(optIdx);
    if (optIdx === round.followUp.correctIndex) {
      sounds.correct();
      setFeedback({ type: 'correct', msg: `✅ ${round.followUp.explanation}` });
      setTimeout(() => {
        if (roundIdx + 1 < ROUNDS.length) {
          setRoundIdx(prev => prev + 1);
          setCurrentKey(1);
          setStage('scale');
          setSelectedOpt(null);
          setFeedback(null);
        } else {
          sounds.levelUp();
          onComplete?.();
        }
      }, 1400);
    } else {
      sounds.wrong();
      setFeedback({ type: 'wrong', msg: '❌ Not quite! Think about: Real votes ÷ Key = Pictures.' });
      setTimeout(() => {
        setSelectedOpt(null);
        setFeedback(null);
      }, 1200);
    }
  }

  return (
    <div className="sim-station-container">
      <div className="sim-station-header">
        <h3 className="sim-station-title">🎚️ Station A: Key Scaler Lab</h3>
        <span className="sim-station-round">Round {roundIdx + 1} / {ROUNDS.length}</span>
      </div>

      <div className="sim-prompt-box">
        {stage === 'scale' ? round.taskPrompt : round.followUp.question}
      </div>

      {/* Key Selector Chips */}
      <div className="scale-selector-row">
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, alignSelf: 'center', color: 'var(--gold)' }}>
          Set Key:
        </span>
        {SCALES.map((k) => (
          <button
            key={k}
            className={`scale-chip-btn ${currentKey === k ? 'active' : ''}`}
            onClick={() => handleSelectKey(k)}
          >
            1 {round.emoji} = {k}
          </button>
        ))}
      </div>

      {/* Live Scaled Pictograph */}
      <div className="pictograph-card">
        <div className="pictograph-title">{round.title}</div>
        {round.targetData.map((row) => {
          const numPictures = Math.floor(row.realVotes / currentKey);
          return (
            <div key={row.name} className="pictograph-row">
              <span className="pictograph-row-label">{row.name}</span>
              <span className="pictograph-symbols">
                {Array.from({ length: numPictures }).map((_, i) => (
                  <span key={i} className="anim-bounce-in">{round.emoji}</span>
                ))}
              </span>
              <span className="pictograph-row-total">
                {row.realVotes} ({numPictures} pics)
              </span>
            </div>
          );
        })}
        <div className="key-fact-box">
          <span className="key-value">🔑 Key in use: 1 {round.emoji} = {currentKey} votes</span>
        </div>
      </div>

      {/* Follow-up Question Stage */}
      {stage === 'question' && (
        <div className="options-grid" style={{ marginTop: 6 }}>
          {round.followUp.options.map((opt, i) => {
            let cls = 'option-btn';
            if (selectedOpt === i && feedback?.type === 'correct') cls += ' correct';
            else if (selectedOpt === i && feedback?.type === 'wrong') cls += ' wrong';
            return (
              <button key={i} className={cls} onClick={() => handleAnswerQuestion(i)}>
                {opt}
              </button>
            );
          })}
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
