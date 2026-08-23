// src/features/simulate/simulations/GraphBuilderStation.jsx
import React, { useState } from 'react';
import './Stations.css';
import { useAudio } from '../../../hooks/useAudio.js';

const ROUNDS = [
  {
    title: 'School Pet Survey',
    emoji: '🐾',
    keyLabel: '1 🐾 = 2 pets',
    keyValue: 2,
    categories: [
      { name: 'Dogs', targetVotes: 8, targetPics: 4 },
      { name: 'Cats', targetVotes: 6, targetPics: 3 },
      { name: 'Birds', targetVotes: 4, targetPics: 2 },
    ],
    followUp: {
      question: 'Which pet has the MOST votes, and by how many more than Birds?',
      options: [
        'Dogs, by 4 more votes',
        'Cats, by 2 more votes',
        'Dogs, by 2 more votes',
        'Birds, by 4 more votes',
      ],
      correctIndex: 0,
      explanation: 'Dogs (8) - Birds (4) = 4 more votes!',
    },
  },
  {
    title: 'Library Book Genres',
    emoji: '📖',
    keyLabel: '1 📖 = 5 books',
    keyValue: 5,
    categories: [
      { name: 'Comics', targetVotes: 15, targetPics: 3 },
      { name: 'Science', targetVotes: 20, targetPics: 4 },
      { name: 'History', targetVotes: 10, targetPics: 2 },
    ],
    followUp: {
      question: 'What is the grand TOTAL number of books across all 3 categories?',
      options: ['45 books', '9 books', '50 books', '40 books'],
      correctIndex: 0,
      explanation: '15 + 20 + 10 = 45 books (9 pictures × 5)!',
    },
  },
];

export default function GraphBuilderStation({ onComplete, audioEnabled }) {
  const { sounds } = useAudio(audioEnabled);
  const [roundIdx, setRoundIdx] = useState(0);
  const [counts, setCounts] = useState({});
  const [stage, setStage] = useState('build'); // 'build' | 'question'
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const round = ROUNDS[roundIdx];

  const getCount = (catName) => counts[`${roundIdx}_${catName}`] || 0;

  function handleAdd(catName) {
    sounds.click();
    setCounts(prev => ({
      ...prev,
      [`${roundIdx}_${catName}`]: Math.min(10, (prev[`${roundIdx}_${catName}`] || 0) + 1),
    }));
  }

  function handleSub(catName) {
    sounds.click();
    setCounts(prev => ({
      ...prev,
      [`${roundIdx}_${catName}`]: Math.max(0, (prev[`${roundIdx}_${catName}`] || 0) - 1),
    }));
  }

  const allMatched = round.categories.every(cat => getCount(cat.name) === cat.targetPics);

  function handleCheckGraph() {
    if (!allMatched) return;
    sounds.correct();
    setFeedback({ type: 'correct', msg: '✅ Graph built perfectly! Now answer the data question below.' });
    setTimeout(() => {
      setStage('question');
      setFeedback(null);
    }, 1100);
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
          setStage('build');
          setSelectedOpt(null);
          setFeedback(null);
        } else {
          sounds.levelUp();
          onComplete?.();
        }
      }, 1400);
    } else {
      sounds.wrong();
      setFeedback({ type: 'wrong', msg: '❌ Not quite! Compare the vote totals carefully.' });
      setTimeout(() => {
        setSelectedOpt(null);
        setFeedback(null);
      }, 1200);
    }
  }

  return (
    <div className="sim-station-container">
      <div className="sim-station-header">
        <h3 className="sim-station-title">📊 Station B: Graph Builder</h3>
        <span className="sim-station-round">Round {roundIdx + 1} / {ROUNDS.length}</span>
      </div>

      <div className="sim-prompt-box">
        {stage === 'build'
          ? `Tap + to place ${round.emoji} symbols for each row until the counts match the survey data!`
          : round.followUp.question}
      </div>

      {/* Key Pill */}
      <div className="key-fact-box" style={{ width: '100%', margin: '0 0 6px' }}>
        <span className="key-value">🔑 {round.keyLabel}</span>
      </div>

      {/* Interactive Builder Grid */}
      <div className="builder-grid">
        {round.categories.map((cat) => {
          const currentPics = getCount(cat.name);
          const isMatched = currentPics === cat.targetPics;
          const currentRealVotes = currentPics * round.keyValue;

          return (
            <div key={cat.name} className={`builder-row ${isMatched ? 'matched' : ''}`}>
              <div className="builder-label-group">
                <span className="builder-row-name">{cat.name}</span>
                <span className="builder-target-badge">
                  Target: {cat.targetVotes} votes ({cat.targetPics} pics)
                </span>
              </div>

              <div className="builder-symbols-area">
                {Array.from({ length: currentPics }).map((_, i) => (
                  <span key={i} className="anim-bounce-in">{round.emoji}</span>
                ))}
              </div>

              {stage === 'build' && (
                <div className="builder-stepper">
                  <button
                    className="stepper-btn"
                    onClick={() => handleSub(cat.name)}
                    disabled={currentPics <= 0}
                  >
                    −
                  </button>
                  <span className="stepper-count">{currentPics}</span>
                  <button
                    className="stepper-btn"
                    onClick={() => handleAdd(cat.name)}
                    disabled={currentPics >= 8}
                  >
                    +
                  </button>
                  {isMatched && <span style={{ fontSize: '1.1rem' }}>✅</span>}
                </div>
              )}

              {stage === 'question' && (
                <span style={{ fontWeight: 800, color: 'var(--gold)' }}>
                  {currentRealVotes} votes
                </span>
              )}
            </div>
          );
        })}
      </div>

      {stage === 'build' && (
        <button
          className={allMatched ? 'btn-green' : 'btn-outline'}
          onClick={handleCheckGraph}
          disabled={!allMatched}
          style={{ width: '100%', maxWidth: 300, marginTop: 6 }}
        >
          {allMatched ? 'Check Graph ✓' : 'Match All Rows to Check'}
        </button>
      )}

      {/* Follow-up Question Options */}
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
