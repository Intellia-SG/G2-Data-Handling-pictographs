// scripts/generate_audio.js
// Pre-generates all known narration phrases as .mp3 files into
// public/assets/audio/ and writes src/utils/audioMap.js.
//
// Usage: node scripts/generate_audio.js
// Requires: VITE_ELEVENLABS_API_KEY in .env.local

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Load .env.local ────────────────────────────────────────────────────────
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
  for (const line of lines) {
    const [key, ...vals] = line.split('=');
    if (key && !process.env[key.trim()]) {
      process.env[key.trim()] = vals.join('=').trim();
    }
  }
}
loadEnv();

const API_KEY = process.env.VITE_ELEVENLABS_API_KEY;
if (!API_KEY) {
  console.warn('⚠️  VITE_ELEVENLABS_API_KEY not set in .env.local — API generation will be skipped if run.');
}

const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2';
const VOICE_MODEL = 'eleven_multilingual_v2';
const AUDIO_DIR = path.join(__dirname, '..', 'public', 'assets', 'audio');
const MAP_PATH  = path.join(__dirname, '..', 'src', 'utils', 'audioMap.js');

const VOICE_SETTINGS = {
  celebration:  { stability: 0.12, similarity_boost: 0.45, style: 0.75, use_speaker_boost: true },
  encouragement:{ stability: 0.16, similarity_boost: 0.50, style: 0.65, use_speaker_boost: true },
  question:     { stability: 0.20, similarity_boost: 0.55, style: 0.55, use_speaker_boost: true },
  emphasis:     { stability: 0.16, similarity_boost: 0.50, style: 0.60, use_speaker_boost: true },
  thinking:     { stability: 0.24, similarity_boost: 0.60, style: 0.35, use_speaker_boost: true },
  statement:    { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
  instruction:  { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
};

const phrases = [
  // INTRO
  { text: "Hi! I'm Tally. Ready to explore picture graphs and become a data detective? Let's begin our journey!", style: 'celebration' },

  // WONDER
  { text: "The Big Fun Fair Mystery!", style: 'celebration' },
  { text: "If Sophie has 4 apple stickers on her poster with a key of 1 apple = 2 votes, why does that mean 8 votes instead of 4?", style: 'question' },
  { text: "Let's investigate how picture graphs and keys work!", style: 'encouragement' },

  // STORY
  { text: "Sophie and Max set up a Favourite Fruit voting booth at the school fun fair. Every classmate who walks past gets to stick one fruit sticker on the poster for their favourite fruit. By lunchtime, the poster is covered in little fruit pictures!", style: 'statement' },
  { text: "Ms. Emma helps the class line up the stickers into neat rows — one row per fruit. This is called a picture graph! She explains that every picture graph needs a key that tells us how much one picture is worth. Today's key is: 1 apple equals 2 votes.", style: 'statement' },
  { text: "Henry counts the apple row — there are 4 apple pictures — and shouts, '4 students chose apples!' Sophie gently stops him. 'Wait, Henry — check the key first! Each picture is worth 2 votes, so 4 pictures means 4 times 2 equals 8 votes, not 4!'", style: 'emphasis' },
  { text: "The finished graph shows: Apples 8 votes, Bananas 6 votes, Grapes 4 votes, Oranges 2 votes. The class practises together — which fruit got the most votes? Which got the fewest? How many votes were there in all? Eight plus six plus four plus two equals twenty votes altogether!", style: 'statement' },
  { text: "Apples won with 8 votes — the most of any fruit! So the fun fair orders apple juice for the snack stand. Sophie cheers: she can now read the key, count a category, compare fruits, and find the total. She is officially a Picture Graph Pro! Let's practise together!", style: 'celebration' },

  // SIMULATE
  { text: "Station A: Key Scaler! Change the scale value to see how the number of picture symbols changes while the real vote count stays the same!", style: 'instruction' },
  { text: "Station B: Graph Builder! Look at the survey data table and add picture symbols to each row until your picture graph is complete!", style: 'instruction' },
  { text: "Station C: Scale Detective! Use the clue to crack the secret key and unlock the hidden votes!", style: 'instruction' },
  { text: "Station D: Spot the Error! One of the pictograph rows has a counting mistake. Tap the error and fix it!", style: 'question' },
  { text: "Amazing! You solved the picture graph puzzle!", style: 'celebration' },
  { text: "Not quite! Check the key and try again.", style: 'encouragement' },

  // PLAY / PRACTICE
  { text: "Amazing! You read the graph perfectly!", style: 'celebration' },
  { text: "Brilliant! That is exactly right!", style: 'celebration' },
  { text: "Superb! Great data detective work!", style: 'celebration' },
  { text: "Excellent! Picture graph mastery at work!", style: 'celebration' },
  { text: "Perfect! You checked the key carefully!", style: 'celebration' },
  { text: "Fantastic streak! Keep on rolling!", style: 'celebration' },
  { text: "Let's check the key and multiply again!", style: 'encouragement' },
  { text: "Hint: Look at the key at the bottom of the graph to see what one picture equals.", style: 'thinking' },
  { text: "Hint: Multiply the number of pictures in the row by the key value.", style: 'thinking' },
  { text: "Excellent work! You completed this district!", style: 'celebration' },
  { text: "The Boss Battle begins! Answer the questions correctly with your 3 lives to defeat the boss!", style: 'emphasis' },
  { text: "Victory! You defeated the boss and claimed your Picto Master reward!", style: 'celebration' },

  // REFLECT
  { text: "Take a moment to reflect on your learning and check your pictograph scorecard!", style: 'question' },
  { text: "Congratulations! You have mastered reading picture graphs, scales, keys, and data totals! You are an official Picture Graph Pro!", style: 'celebration' },
];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .slice(0, 50);
}

async function generateAudio(text, style) {
  const settings = VOICE_SETTINGS[style] || VOICE_SETTINGS.statement;
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'xi-api-key': API_KEY },
    body: JSON.stringify({ text, model_id: VOICE_MODEL, voice_settings: settings }),
  });
  if (!res.ok) throw new Error(`ElevenLabs error ${res.status}: ${await res.text()}`);
  const buf = await res.arrayBuffer();
  return Buffer.from(buf);
}

(async () => {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
  const audioMapEntries = [];
  let generated = 0;

  for (let i = 0; i < phrases.length; i++) {
    const { text, style } = phrases[i];
    const filename = `audio_${slugify(text)}_${i}.mp3`;
    const filePath = path.join(AUDIO_DIR, filename);
    const assetPath = `/assets/audio/${filename}`;

    audioMapEntries.push([text, assetPath]);

    if (fs.existsSync(filePath)) {
      continue;
    }

    if (API_KEY) {
      try {
        process.stdout.write(`🎙  Generating [${i + 1}/${phrases.length}] ${style}: "${text.slice(0, 48)}…" `);
        const buf = await generateAudio(text, style);
        fs.writeFileSync(filePath, buf);
        console.log(`✓ ${filename}`);
        generated++;
        await new Promise((r) => setTimeout(r, 400));
      } catch (err) {
        console.error(`\n❌  Failed: ${err.message}`);
      }
    }
  }

  const mapContent = `// src/utils/audioMap.js
// AUTO-GENERATED by scripts/generate_audio.js — do not edit by hand.
// Run \`node scripts/generate_audio.js\` to regenerate with API key.

export const audioMap = {
${audioMapEntries.map(([text, p]) => `  ${JSON.stringify(text)}: ${JSON.stringify(p)},`).join('\n')}
};

export default audioMap;
`;
  fs.writeFileSync(MAP_PATH, mapContent);
  console.log(`✅  audioMap.js updated (${audioMapEntries.length} entries). Generated ${generated} new files.`);
})();
