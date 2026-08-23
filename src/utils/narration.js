// src/utils/narration.js
// Narration helper segments with exact 1:1 parity with UI and audioMap

export const say       = (text) => ({ text, style: 'statement' });
export const ask       = (text) => ({ text, style: 'question' });
export const cheer     = (text) => ({ text, style: 'celebration' });
export const emphasize = (text) => ({ text, style: 'emphasis' });
export const think     = (text) => ({ text, style: 'thinking' });
export const celebrate = (text) => ({ text, style: 'celebration' });
export const instruct  = (text) => ({ text, style: 'instruction' });
export const encourage = (text) => ({ text, style: 'encouragement' });

// ─── INTRO ────────────────────────────────────────────────────────────────
export function introNarration() {
  return [
    cheer("Hi! I'm Tally. Ready to explore picture graphs and become a data detective? Let's begin our journey!"),
  ];
}

// ─── WONDER ──────────────────────────────────────────────────────────────
export function wonderNarration() {
  return [
    cheer("The Big Fun Fair Mystery!"),
    ask("If Sophie has 4 apple stickers on her poster with a key of 1 apple = 2 votes, why does that mean 8 votes instead of 4?"),
    encourage("Let's investigate how picture graphs and keys work!"),
  ];
}

// ─── STORY — "Sophie's Fun Fair Survey" ───────────────────────────────────
export function storyNarration(panelIndex) {
  const panels = [
    [say("Sophie and Max set up a Favourite Fruit voting booth at the school fun fair. Every classmate who walks past gets to stick one fruit sticker on the poster for their favourite fruit. By lunchtime, the poster is covered in little fruit pictures!")],
    [say("Ms. Emma helps the class line up the stickers into neat rows — one row per fruit. This is called a picture graph! She explains that every picture graph needs a key that tells us how much one picture is worth. Today's key is: 1 apple equals 2 votes.")],
    [emphasize("Henry counts the apple row — there are 4 apple pictures — and shouts, '4 students chose apples!' Sophie gently stops him. 'Wait, Henry — check the key first! Each picture is worth 2 votes, so 4 pictures means 4 times 2 equals 8 votes, not 4!'")],
    [say("The finished graph shows: Apples 8 votes, Bananas 6 votes, Grapes 4 votes, Oranges 2 votes. The class practises together — which fruit got the most votes? Which got the fewest? How many votes were there in all? Eight plus six plus four plus two equals twenty votes altogether!")],
    [celebrate("Apples won with 8 votes — the most of any fruit! So the fun fair orders apple juice for the snack stand. Sophie cheers: she can now read the key, count a category, compare fruits, and find the total. She is officially a Picture Graph Pro! Let's practise together!")],
  ];
  return panels[panelIndex] || panels[0];
}

// ─── SIMULATE ────────────────────────────────────────────────────────────
export function simStationIntro(stationIndex) {
  const intros = [
    [instruct("Station A: Key Scaler! Change the scale value to see how the number of picture symbols changes while the real vote count stays the same!")],
    [instruct("Station B: Graph Builder! Look at the survey data table and add picture symbols to each row until your picture graph is complete!")],
    [instruct("Station C: Scale Detective! Use the clue to crack the secret key and unlock the hidden votes!")],
    [ask("Station D: Spot the Error! One of the pictograph rows has a counting mistake. Tap the error and fix it!")],
  ];
  return intros[stationIndex] || intros[0];
}

export function simFeedback(correct) {
  if (correct) return [celebrate("Amazing! You solved the picture graph puzzle!")];
  return [encourage("Not quite! Check the key and try again.")];
}

// ─── PLAY / PRACTICE ──────────────────────────────────────────────────────
export function playQuestionNarration(questionText) {
  return [ask(questionText)];
}

export function playCorrectNarration(streak = 1) {
  const compliments = [
    "Amazing! You read the graph perfectly!",
    "Brilliant! That is exactly right!",
    "Superb! Great data detective work!",
    "Excellent! Picture graph mastery at work!",
    "Perfect! You checked the key carefully!",
  ];
  const msg = compliments[Math.floor(Math.random() * compliments.length)];
  if (streak >= 5) {
    return [
      celebrate(msg),
      celebrate("Fantastic streak! Keep on rolling!"),
    ];
  }
  return [celebrate(msg)];
}

export function playWrongNarration() {
  return [encourage("Let's check the key and multiply again!")];
}

export function playHint1Narration() {
  return [think("Hint: Look at the key at the bottom of the graph to see what one picture equals.")];
}

export function playHint2Narration() {
  return [think("Hint: Multiply the number of pictures in the row by the key value.")];
}

export function districtCompleteNarration() {
  return [celebrate("Excellent work! You completed this district!")];
}

export function bossStartNarration() {
  return [emphasize("The Boss Battle begins! Answer the questions correctly with your 3 lives to defeat the boss!")];
}

export function bossWinNarration() {
  return [celebrate("Victory! You defeated the boss and claimed your Picto Master reward!")];
}

// ─── REFLECT ─────────────────────────────────────────────────────────────
export function reflectNarration() {
  return [ask("Take a moment to reflect on your learning and check your pictograph scorecard!")];
}

export function reflectCompleteNarration() {
  return [
    celebrate("Congratulations! You have mastered reading picture graphs, scales, keys, and data totals! You are an official Picture Graph Pro!"),
  ];
}
