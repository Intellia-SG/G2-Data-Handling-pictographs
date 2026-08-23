// src/data/storyContent.js
// 5-panel educational story for Grade 3 Pictographs featuring English characters: Sophie, Max, Ms. Emma, and Henry.

export const STORY_PANELS = [
  {
    panel: 0,
    title: "Fun Fair Day! 🎪",
    text: "Sophie and Max set up a Favourite Fruit voting booth at the school fun fair. Every classmate who walks past gets to stick one fruit sticker on the poster for their favourite fruit. By lunchtime, the poster is covered in little fruit pictures!",
    character: "Sophie & Max",
    imageEmoji: "🎪",
    imageBg: "linear-gradient(135deg, #1a237e 0%, #283593 100%)",
    imageScene: "fun_fair_booth",
    highlight: "Stickers Show Raw Data 🍓",
  },
  {
    panel: 1,
    title: "Meet the Key! 🔑",
    text: "Ms. Emma helps the class line up the stickers into neat rows — one row per fruit. This is called a picture graph! She explains that every picture graph needs a key that tells us how much one picture is worth. Today's key is: 1 apple equals 2 votes.",
    character: "Ms. Emma",
    imageEmoji: "🔑",
    imageBg: "linear-gradient(135deg, #4a148c 0%, #7b1fa2 100%)",
    imageScene: "meet_the_key",
    highlight: "1 🍎 = 2 Votes (The Key)",
  },
  {
    panel: 2,
    title: "Henry's Mistake 🤔",
    text: "Henry counts the apple row — there are 4 apple pictures — and shouts, '4 students chose apples!' Sophie gently stops him. 'Wait, Henry — check the key first! Each picture is worth 2 votes, so 4 pictures means 4 times 2 equals 8 votes, not 4!'",
    character: "Henry & Sophie",
    imageEmoji: "💡",
    imageBg: "linear-gradient(135deg, #01579b 0%, #0277bd 100%)",
    imageScene: "henry_learning",
    highlight: "4 Pictures × 2 = 8 Votes!",
  },
  {
    panel: 3,
    title: "Reading the Whole Graph 📊",
    text: "The finished graph shows: Apples 8 votes, Bananas 6 votes, Grapes 4 votes, Oranges 2 votes. The class practises together — which fruit got the most votes? Which got the fewest? How many votes were there in all? Eight plus six plus four plus two equals twenty votes altogether!",
    character: "Class Survey",
    imageEmoji: "📊",
    imageBg: "linear-gradient(135deg, #b71c1c 0%, #d32f2f 100%)",
    imageScene: "reading_graph",
    highlight: "8 + 6 + 4 + 2 = 20 Total Votes",
  },
  {
    panel: 4,
    title: "Fun Fair Winner! 🏆",
    text: "Apples won with 8 votes — the most of any fruit! So the fun fair orders apple juice for the snack stand. Sophie cheers: she can now read the key, count a category, compare fruits, and find the total. She is officially a Picture Graph Pro! Let's practise together!",
    character: "Sophie",
    imageEmoji: "🏆",
    imageBg: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)",
    imageScene: "celebration",
    highlight: "Picture Graph Pro! 🌟",
  },
];

export default STORY_PANELS;
