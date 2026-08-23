// src/data/questionBank.js
// 100 Pictograph Questions across 10 Themed Districts (Grade 3)

import { shuffleArray } from '../utils/shuffle.js';

export const DISTRICTS = [
  { id: 0, name: 'Fruit Stand',       icon: '🍎', boss: { name: 'Count Critter',   emoji: '🎪', reward: 'Fruit Star Badge 🍎' } },
  { id: 1, name: 'Pet Parade',        icon: '🐶', boss: { name: 'Pet Puzzler',     emoji: '🐾', reward: 'Pet Pro Badge 🐶' } },
  { id: 2, name: 'Sports Arena',      icon: '⚽', boss: { name: 'Score Keeper',    emoji: '🏅', reward: 'Sports Champ Badge ⚽' } },
  { id: 3, name: 'Colour Kingdom',    icon: '🎨', boss: { name: 'Colour Chaos',    emoji: '🖌️', reward: 'Colour Crown Badge 🎨' } },
  { id: 4, name: 'Weather Station',   icon: '🌤️', boss: { name: 'Storm Brain',     emoji: '⛈️', reward: 'Weather Wizard Badge 🌤️' } },
  { id: 5, name: 'Pencil Factory',    icon: '✏️', boss: { name: 'Pencil Phantom',  emoji: '👻', reward: 'Factory Foreman Badge ✏️' } },
  { id: 6, name: 'Book Library',      icon: '📚', boss: { name: 'Reading Rex',     emoji: '🦕', reward: 'Bookworm Badge 📚' } },
  { id: 7, name: 'Ice Cream Parlour', icon: '🍦', boss: { name: 'Brain Freeze',    emoji: '🥶', reward: 'Scoop Star Badge 🍦' } },
  { id: 8, name: 'Transport Town',    icon: '🚗', boss: { name: 'Speed Demon',     emoji: '🏎️', reward: 'Road Master Badge 🚗' } },
  { id: 9, name: 'Picto Citadel',     icon: '🏰', boss: { name: 'Graph Guardian',  emoji: '👑', reward: 'Picto Grand Master Badge 🏰' } },
];

function q(id, districtId, category, questionText, options, correctAnswer, explanation, hint1, hint2) {
  return { id, districtId, category, questionText, options, correctAnswer, explanation, hint1, hint2 };
}

const RAW_QUESTIONS = [
  // ── DISTRICT 0: FRUIT STAND (1-10) ───────────────────────────────────────
  q(1, 0, 'READ_KEY', 'A picture graph shows favourite fruits. The key says 1 🍎 = 2 votes. There are 4 apple pictures. How many students chose apples?', ['8', '4', '6', '2'], '8', '4 pictures × 2 votes each = 8 votes.', 'Multiply the number of pictures by the key value.', '4 × 2 = 8.'),
  q(2, 0, 'READ_KEY', 'The key says 1 🍌 = 5 votes. There are 3 banana pictures. How many votes for bananas?', ['15', '8', '3', '10'], '15', '3 pictures × 5 = 15 votes.', 'Each picture stands for 5 votes.', '3 × 5 = 15.'),
  q(3, 0, 'COUNT_CATEGORY', 'A picture graph shows: Apples 🍎🍎🍎🍎, Bananas 🍌🍌🍌. Key: 1 picture = 2 votes. Which fruit has MORE votes?', ['Apples', 'Bananas', 'They are equal', 'Cannot tell'], 'Apples', 'Apples: 4×2=8, Bananas: 3×2=6. 8 > 6.', 'Count pictures in each row and multiply by the key.', 'Apples have 4 pictures, Bananas have 3.'),
  q(4, 0, 'FIND_TOTAL', 'Fruits: Apples=8 votes, Grapes=4 votes, Oranges=6 votes. What is the total number of votes?', ['18', '14', '20', '12'], '18', '8 + 4 + 6 = 18.', 'Add all the votes together.', '8 + 4 + 6 = ?'),
  q(5, 0, 'IDENTIFY_KEY', 'A picture graph has 5 star pictures for "Apples" and the total is 10 votes. What must the key be?', ['1 ⭐ = 2 votes', '1 ⭐ = 5 votes', '1 ⭐ = 1 vote', '1 ⭐ = 10 votes'], '1 ⭐ = 2 votes', '10 ÷ 5 = 2, so each star = 2 votes.', 'Divide the total by the number of pictures.', '10 ÷ 5 = 2.'),
  q(6, 0, 'FIND_DIFFERENCE', 'Apples got 10 votes, Bananas got 6 votes. How many MORE votes did Apples get?', ['4', '6', '16', '10'], '4', '10 - 6 = 4 more votes.', 'Subtract the smaller from the larger.', '10 - 6 = ?'),
  q(7, 0, 'MOST_LEAST', 'Fruits: Grapes=12, Oranges=8, Kiwis=4, Mangos=10. Which fruit is LEAST popular?', ['Kiwis', 'Oranges', 'Mangos', 'Grapes'], 'Kiwis', 'Kiwis have only 4 votes — the fewest.', 'Look for the smallest number.', 'Compare: 12, 8, 4, 10 — which is smallest?'),
  q(8, 0, 'READ_KEY', 'Key: 1 🍇 = 10 votes. There are 2 grape pictures. How many votes for grapes?', ['20', '12', '2', '10'], '20', '2 × 10 = 20.', 'Multiply pictures by the key.', '2 × 10 = 20.'),
  q(9, 0, 'TWO_STEP', 'Apples got 12 votes and Bananas got 8. If 4 more students vote for Bananas, will Bananas beat Apples?', ['No, they will be equal', 'Yes', 'No, Apples still win', 'Cannot tell'], 'No, they will be equal', '8 + 4 = 12, same as Apples — a tie!', 'Add 4 to the banana count and compare.', '8 + 4 = 12 = Apples.'),
  q(10, 0, 'BOSS', 'The Fruit Stand has 6 rows of pictures. Key: 1 picture = 5 votes. Row counts: 3, 5, 2, 4, 6, 1. What is the grand total of all votes?', ['105', '21', '100', '110'], '105', '(3+5+2+4+6+1) × 5 = 21 × 5 = 105.', 'Add all picture counts, then multiply by the key.', '3+5+2+4+6+1 = 21, then 21 × 5 = ?'),

  // ── DISTRICT 1: PET PARADE (11-20) ───────────────────────────────────────
  q(11, 1, 'READ_KEY', 'A pet survey graph has key: 1 🐾 = 2 pets. There are 6 paw prints for dogs. How many dogs were counted?', ['12', '6', '8', '3'], '12', '6 × 2 = 12 dogs.', 'Multiply the pictures by the key.', '6 × 2 = ?'),
  q(12, 1, 'MOST_LEAST', 'Pets: Dogs=12, Cats=8, Fish=14, Hamsters=6. Which pet is MOST popular?', ['Fish', 'Dogs', 'Cats', 'Hamsters'], 'Fish', 'Fish has 14 votes — the most.', 'Find the largest number.', '14 is the biggest of 12, 8, 14, 6.'),
  q(13, 1, 'FIND_TOTAL', 'Dogs=12, Cats=8, Fish=6. What is the total number of pets surveyed?', ['26', '20', '18', '32'], '26', '12 + 8 + 6 = 26.', 'Add all the pet counts together.', '12 + 8 + 6 = ?'),
  q(14, 1, 'FIND_DIFFERENCE', 'Dogs got 14 votes, Cats got 8 votes. How many FEWER votes did Cats get?', ['6', '8', '22', '14'], '6', '14 - 8 = 6.', 'Subtract the smaller from the larger.', '14 - 8 = ?'),
  q(15, 1, 'COUNT_CATEGORY', 'Key: 1 🐱 = 3 pets. There are 4 cat pictures. What is the real count?', ['12', '7', '4', '3'], '12', '4 × 3 = 12 cats.', 'Multiply pictures by the key value.', '4 × 3 = ?'),
  q(16, 1, 'IDENTIFY_KEY', 'A graph shows 8 pictures for "Birds" and the total is 16. What is the key?', ['1 picture = 2', '1 picture = 8', '1 picture = 1', '1 picture = 4'], '1 picture = 2', '16 ÷ 8 = 2.', 'Divide total by number of pictures.', '16 ÷ 8 = ?'),
  q(17, 1, 'MORE_FEWER', 'Dogs have 5 pictures, Cats have 3 pictures. Key = 2. How many MORE pets are dogs than cats?', ['4', '2', '8', '6'], '4', 'Dogs: 5×2=10, Cats: 3×2=6. Difference = 4.', 'Calculate each total first, then subtract.', '10 - 6 = ?'),
  q(18, 1, 'ORDER', 'Hamsters=4, Dogs=10, Cats=8, Fish=6. Order from MOST to LEAST.', ['Dogs, Cats, Fish, Hamsters', 'Hamsters, Fish, Cats, Dogs', 'Fish, Dogs, Cats, Hamsters', 'Dogs, Fish, Cats, Hamsters'], 'Dogs, Cats, Fish, Hamsters', '10 > 8 > 6 > 4.', 'Put the numbers in order from biggest to smallest.', '10, 8, 6, 4.'),
  q(19, 1, 'TWO_STEP', 'There are 20 pets in total. Dogs=8, Cats=6, Birds=?. How many birds?', ['6', '14', '2', '8'], '6', '20 - 8 - 6 = 6 birds.', 'Subtract known amounts from the total.', '20 - 8 - 6 = ?'),
  q(20, 1, 'BOSS', 'Pet survey key: 1 🐾 = 5. Dogs: 4 pictures, Cats: 3 pictures, Fish: 6 pictures, Rabbits: 2 pictures. What is the total?', ['75', '15', '80', '70'], '75', '(4+3+6+2)×5 = 15×5 = 75.', 'Add pictures, multiply by key.', '4+3+6+2=15, 15×5=?'),

  // ── DISTRICT 2: SPORTS ARENA (21-30) ─────────────────────────────────────
  q(21, 2, 'READ_KEY', 'Sports survey key: 1 ⚽ = 4 votes. Cricket has 5 balls. How many votes for cricket?', ['20', '9', '5', '16'], '20', '5 × 4 = 20.', 'Multiply pictures by key.', '5 × 4 = ?'),
  q(22, 2, 'MOST_LEAST', 'Football=24, Cricket=20, Tennis=12, Swimming=16. Which sport is LEAST popular?', ['Tennis', 'Swimming', 'Cricket', 'Football'], 'Tennis', 'Tennis has 12 — the fewest.', 'Find the smallest number.', '12 is the smallest.'),
  q(23, 2, 'FIND_TOTAL', 'Football=24, Tennis=12, Swimming=16. Total votes?', ['52', '48', '40', '56'], '52', '24+12+16=52.', 'Add all votes together.', '24+12+16=?'),
  q(24, 2, 'FIND_DIFFERENCE', 'Football got 24 votes, Tennis got 12. Difference?', ['12', '36', '6', '24'], '12', '24-12=12.', 'Subtract smaller from larger.', '24-12=?'),
  q(25, 2, 'COUNT_CATEGORY', 'Key: 1 🏀 = 2. Basketball row has 7 pictures. How many votes?', ['14', '9', '7', '5'], '14', '7×2=14.', 'Multiply pictures by key.', '7×2=?'),
  q(26, 2, 'IDENTIFY_KEY', '10 pictures, total = 50 votes. What is the key?', ['1 picture = 5', '1 picture = 10', '1 picture = 50', '1 picture = 2'], '1 picture = 5', '50÷10=5.', 'Divide total by pictures.', '50÷10=?'),
  q(27, 2, 'MORE_FEWER', 'Swimming: 4 pictures, Hockey: 6 pictures. Key=3. How many MORE votes does Hockey have?', ['6', '2', '18', '12'], '6', 'Hockey: 6×3=18, Swimming: 4×3=12. 18-12=6.', 'Calculate each total then subtract.', '18-12=?'),
  q(28, 2, 'ORDER', 'Badminton=6, Tennis=14, Football=20, Cricket=10. Order from LEAST to MOST.', ['Badminton, Tennis, Cricket, Football', 'Badminton, Cricket, Tennis, Football', 'Football, Tennis, Cricket, Badminton', 'Cricket, Badminton, Tennis, Football'], 'Badminton, Cricket, Tennis, Football', '6<10<14<20.', 'Put numbers smallest to biggest.', '6, 10, 14, 20.'),
  q(29, 2, 'TWO_STEP', 'Total = 40 votes. Football=16, Cricket=14. How many voted for "Other"?', ['10', '30', '6', '14'], '10', '40-16-14=10.', 'Subtract known from total.', '40-16-14=?'),
  q(30, 2, 'BOSS', 'Key: 1 picture = 10 votes. Rows: Football 3, Cricket 4, Tennis 2, Swimming 5, Hockey 1. Grand total?', ['150', '15', '100', '200'], '150', '(3+4+2+5+1)×10=15×10=150.', 'Sum pictures, multiply by key.', '15×10=?'),

  // ── DISTRICT 3: COLOUR KINGDOM (31-40) ───────────────────────────────────
  q(31, 3, 'READ_KEY', 'Key: 1 🔵 = 2 votes. Blue row has 5 circles. How many chose blue?', ['10', '5', '7', '3'], '10', '5×2=10.', 'Multiply pictures by key.', '5×2=?'),
  q(32, 3, 'MOST_LEAST', 'Red=8, Blue=10, Green=6, Yellow=12. Most popular colour?', ['Yellow', 'Blue', 'Red', 'Green'], 'Yellow', 'Yellow has 12 — the most.', 'Find the largest value.', '12 is the biggest.'),
  q(33, 3, 'FIND_TOTAL', 'Red=8, Blue=10, Green=6. Total votes?', ['24', '18', '20', '26'], '24', '8+10+6=24.', 'Add all together.', '8+10+6=?'),
  q(34, 3, 'FIND_DIFFERENCE', 'Blue=10, Green=6. How many more chose Blue?', ['4', '16', '6', '10'], '4', '10-6=4.', 'Subtract smaller from larger.', '10-6=?'),
  q(35, 3, 'COUNT_CATEGORY', 'Key: 1 🟢 = 5 votes. Green row: 3 circles. Total for green?', ['15', '8', '3', '35'], '15', '3×5=15.', 'Multiply pictures by key.', '3×5=?'),
  q(36, 3, 'IDENTIFY_KEY', '4 pictures for Purple, total = 20. Key?', ['1 picture = 5', '1 picture = 4', '1 picture = 20', '1 picture = 10'], '1 picture = 5', '20÷4=5.', 'Divide total by picture count.', '20÷4=?'),
  q(37, 3, 'MORE_FEWER', 'Red: 6 pictures, Orange: 4 pictures. Key=2. Difference?', ['4', '10', '2', '20'], '4', 'Red: 6×2=12, Orange: 4×2=8. 12-8=4.', 'Find each total, then subtract.', '12-8=?'),
  q(38, 3, 'ORDER', 'Pink=14, Purple=8, Teal=10, Gold=20. Least to most?', ['Purple, Teal, Pink, Gold', 'Gold, Pink, Teal, Purple', 'Teal, Purple, Pink, Gold', 'Purple, Pink, Teal, Gold'], 'Purple, Teal, Pink, Gold', '8<10<14<20.', 'Order from smallest to largest.', '8, 10, 14, 20.'),
  q(39, 3, 'TWO_STEP', 'Red and Blue together = 22. Red = 10. How many for Blue?', ['12', '32', '22', '10'], '12', '22-10=12.', 'Subtract Red from the combined total.', '22-10=?'),
  q(40, 3, 'BOSS', 'Key: 1 picture = 4 votes. Red:5, Blue:3, Green:4, Yellow:6, Purple:2. Total?', ['80', '20', '100', '60'], '80', '(5+3+4+6+2)×4=20×4=80.', 'Sum all pictures, multiply by key.', '20×4=?'),

  // ── DISTRICT 4: WEATHER STATION (41-50) ──────────────────────────────────
  q(41, 4, 'READ_KEY', 'Key: 1 ☀️ = 3 days. Sunny row: 4 suns. How many sunny days?', ['12', '7', '4', '3'], '12', '4×3=12.', 'Multiply pictures by key.', '4×3=?'),
  q(42, 4, 'MOST_LEAST', 'Sunny=12, Rainy=9, Cloudy=6, Snowy=3. Most common weather?', ['Sunny', 'Rainy', 'Cloudy', 'Snowy'], 'Sunny', 'Sunny=12, the highest.', 'Find the largest number.', '12 is the biggest.'),
  q(43, 4, 'FIND_TOTAL', 'Sunny=12, Rainy=9, Cloudy=6, Snowy=3. Total days recorded?', ['30', '27', '24', '33'], '30', '12+9+6+3=30.', 'Add all values.', '12+9+6+3=?'),
  q(44, 4, 'FIND_DIFFERENCE', 'Sunny=12, Snowy=3. How many more sunny days?', ['9', '15', '3', '12'], '9', '12-3=9.', 'Subtract smaller from larger.', '12-3=?'),
  q(45, 4, 'COUNT_CATEGORY', 'Key: 1 🌧️ = 2 days. Rain row: 5 pictures. Rainy days?', ['10', '7', '5', '3'], '10', '5×2=10.', 'Multiply pictures by key.', '5×2=?'),
  q(46, 4, 'IDENTIFY_KEY', '6 cloud pictures, total = 18 cloudy days. Key?', ['1 picture = 3', '1 picture = 6', '1 picture = 12', '1 picture = 2'], '1 picture = 3', '18÷6=3.', 'Divide total by pictures.', '18÷6=?'),
  q(47, 4, 'MORE_FEWER', 'Rainy: 3 pictures, Windy: 5 pictures. Key=2. Which has more and by how much?', ['Windy, by 4', 'Rainy, by 4', 'Windy, by 2', 'They are equal'], 'Windy, by 4', 'Windy: 5×2=10, Rainy: 3×2=6. 10-6=4.', 'Calculate each total and compare.', '10-6=?'),
  q(48, 4, 'ORDER', 'Foggy=2, Stormy=8, Windy=6, Hail=4. Most to least?', ['Stormy, Windy, Hail, Foggy', 'Foggy, Hail, Windy, Stormy', 'Stormy, Hail, Windy, Foggy', 'Windy, Stormy, Hail, Foggy'], 'Stormy, Windy, Hail, Foggy', '8>6>4>2.', 'Biggest to smallest.', '8, 6, 4, 2.'),
  q(49, 4, 'TWO_STEP', 'Total days in survey = 28. Sunny=10, Rainy=8, Cloudy=?. How many cloudy days?', ['10', '18', '6', '8'], '10', '28-10-8=10.', 'Subtract known from total.', '28-10-8=?'),
  q(50, 4, 'BOSS', 'Key: 1 picture = 5 days. Sunny:6, Rainy:3, Cloudy:4, Snowy:2, Windy:5. Grand total?', ['100', '20', '90', '110'], '100', '(6+3+4+2+5)×5=20×5=100.', 'Sum pictures, multiply by key.', '20×5=?'),

  // ── DISTRICT 5: PENCIL FACTORY (51-60) ───────────────────────────────────
  q(51, 5, 'READ_KEY', 'Key: 1 ✏️ = 10 pencils. Red pencil row: 3 pictures. How many red pencils?', ['30', '13', '3', '10'], '30', '3×10=30.', 'Multiply pictures by key.', '3×10=?'),
  q(52, 5, 'MOST_LEAST', 'Red=30, Blue=50, Green=20, Yellow=40. Which colour pencil is LEAST produced?', ['Green', 'Red', 'Yellow', 'Blue'], 'Green', 'Green=20, the smallest.', 'Find the smallest value.', '20 is the fewest.'),
  q(53, 5, 'FIND_TOTAL', 'Red=30, Blue=50, Green=20. Total pencils?', ['100', '80', '110', '90'], '100', '30+50+20=100.', 'Add all together.', '30+50+20=?'),
  q(54, 5, 'FIND_DIFFERENCE', 'Blue=50 pencils, Green=20 pencils. Difference?', ['30', '70', '20', '50'], '30', '50-20=30.', 'Subtract smaller from larger.', '50-20=?'),
  q(55, 5, 'COUNT_CATEGORY', 'Key: 1 ✏️ = 5. Yellow row: 8 pictures. Total yellow pencils?', ['40', '13', '8', '35'], '40', '8×5=40.', 'Multiply pictures by key.', '8×5=?'),
  q(56, 5, 'IDENTIFY_KEY', '4 pictures for Orange, total = 40 pencils. Key?', ['1 picture = 10', '1 picture = 4', '1 picture = 8', '1 picture = 40'], '1 picture = 10', '40÷4=10.', 'Divide total by pictures.', '40÷4=?'),
  q(57, 5, 'MORE_FEWER', 'Red: 5 pictures, Purple: 3 pictures. Key=10. Difference?', ['20', '80', '50', '30'], '20', 'Red: 5×10=50, Purple: 3×10=30. 50-30=20.', 'Find each total then subtract.', '50-30=?'),
  q(58, 5, 'ORDER', 'Pink=40, Black=60, White=10, Brown=30. Most to least?', ['Black, Pink, Brown, White', 'White, Brown, Pink, Black', 'Black, Brown, Pink, White', 'Pink, Black, Brown, White'], 'Black, Pink, Brown, White', '60>40>30>10.', 'Order biggest to smallest.', '60, 40, 30, 10.'),
  q(59, 5, 'TWO_STEP', 'Factory makes 120 pencils total. Red=40, Blue=50. How many Others?', ['30', '90', '10', '70'], '30', '120-40-50=30.', 'Subtract known from total.', '120-40-50=?'),
  q(60, 5, 'BOSS', 'Key: 1 ✏️ = 10. Red:4, Blue:6, Green:3, Yellow:5, Purple:2. Total production?', ['200', '20', '150', '250'], '200', '(4+6+3+5+2)×10=20×10=200.', 'Sum pictures, multiply by key.', '20×10=?'),

  // ── DISTRICT 6: BOOK LIBRARY (61-70) ─────────────────────────────────────
  q(61, 6, 'READ_KEY', 'Key: 1 📖 = 3 books. Fiction row: 6 pictures. Books in Fiction?', ['18', '9', '6', '3'], '18', '6×3=18.', 'Multiply pictures by key.', '6×3=?'),
  q(62, 6, 'MOST_LEAST', 'Fiction=18, Science=12, History=9, Comics=15. MOST borrowed?', ['Fiction', 'Comics', 'Science', 'History'], 'Fiction', 'Fiction=18, the highest.', 'Find the largest number.', '18 is the biggest.'),
  q(63, 6, 'FIND_TOTAL', 'Fiction=18, Science=12, History=9. Total?', ['39', '30', '36', '42'], '39', '18+12+9=39.', 'Add all values.', '18+12+9=?'),
  q(64, 6, 'FIND_DIFFERENCE', 'Fiction=18, History=9. Difference?', ['9', '27', '18', '3'], '9', '18-9=9.', 'Subtract smaller from larger.', '18-9=?'),
  q(65, 6, 'COUNT_CATEGORY', 'Key: 1 📖 = 5. Poetry row: 4 pictures. Total poetry books?', ['20', '9', '4', '25'], '20', '4×5=20.', 'Multiply pictures by key.', '4×5=?'),
  q(66, 6, 'IDENTIFY_KEY', '5 pictures for Comics, total = 25. Key?', ['1 picture = 5', '1 picture = 25', '1 picture = 10', '1 picture = 3'], '1 picture = 5', '25÷5=5.', 'Divide total by pictures.', '25÷5=?'),
  q(67, 6, 'MORE_FEWER', 'Mystery: 7 pics, Adventure: 5 pics. Key=2. Difference?', ['4', '12', '2', '24'], '4', 'Mystery: 7×2=14, Adventure: 5×2=10. 14-10=4.', 'Calculate totals then subtract.', '14-10=?'),
  q(68, 6, 'ORDER', 'Fantasy=21, Science=9, Comics=15, Poetry=6. Least to most?', ['Poetry, Science, Comics, Fantasy', 'Fantasy, Comics, Science, Poetry', 'Science, Poetry, Comics, Fantasy', 'Poetry, Comics, Science, Fantasy'], 'Poetry, Science, Comics, Fantasy', '6<9<15<21.', 'Smallest to largest.', '6, 9, 15, 21.'),
  q(69, 6, 'TWO_STEP', 'Library has 50 books total. Fiction=20, Science=15. How many Others?', ['15', '35', '50', '5'], '15', '50-20-15=15.', 'Subtract known from total.', '50-20-15=?'),
  q(70, 6, 'BOSS', 'Key: 1 📖 = 4. Fiction:5, Science:3, History:4, Comics:6, Poetry:2. Total?', ['80', '20', '60', '100'], '80', '(5+3+4+6+2)×4=20×4=80.', 'Sum pictures, multiply by key.', '20×4=?'),

  // ── DISTRICT 7: ICE CREAM PARLOUR (71-80) ────────────────────────────────
  q(71, 7, 'READ_KEY', 'Key: 1 🍦 = 2 scoops sold. Chocolate row: 7 pictures. Total chocolate scoops?', ['14', '9', '7', '5'], '14', '7×2=14.', 'Multiply pictures by key.', '7×2=?'),
  q(72, 7, 'MOST_LEAST', 'Vanilla=10, Chocolate=14, Strawberry=8, Mint=6. Least popular?', ['Mint', 'Strawberry', 'Vanilla', 'Chocolate'], 'Mint', 'Mint=6, the smallest.', 'Find the smallest value.', '6 is the fewest.'),
  q(73, 7, 'FIND_TOTAL', 'Vanilla=10, Chocolate=14, Strawberry=8. Total scoops sold?', ['32', '28', '24', '36'], '32', '10+14+8=32.', 'Add all values.', '10+14+8=?'),
  q(74, 7, 'FIND_DIFFERENCE', 'Chocolate=14, Mint=6. How many more scoops of Chocolate?', ['8', '20', '6', '14'], '8', '14-6=8.', 'Subtract smaller from larger.', '14-6=?'),
  q(75, 7, 'COUNT_CATEGORY', 'Key: 1 🍦 = 5. Mango row: 3 pictures. Total mango scoops?', ['15', '8', '3', '50'], '15', '3×5=15.', 'Multiply pictures by key.', '3×5=?'),
  q(76, 7, 'IDENTIFY_KEY', '6 pictures for Strawberry, total = 12. Key?', ['1 picture = 2', '1 picture = 6', '1 picture = 12', '1 picture = 3'], '1 picture = 2', '12÷6=2.', 'Divide total by pictures.', '12÷6=?'),
  q(77, 7, 'MORE_FEWER', 'Cookie: 4 pics, Bubblegum: 6 pics. Key=3. Difference?', ['6', '30', '2', '18'], '6', 'Cookie: 4×3=12, Bubblegum: 6×3=18. 18-12=6.', 'Find totals then subtract.', '18-12=?'),
  q(78, 7, 'ORDER', 'Mango=15, Vanilla=25, Choco=20, Berry=10. Most to least?', ['Vanilla, Choco, Mango, Berry', 'Berry, Mango, Choco, Vanilla', 'Vanilla, Mango, Choco, Berry', 'Choco, Vanilla, Berry, Mango'], 'Vanilla, Choco, Mango, Berry', '25>20>15>10.', 'Biggest to smallest.', '25, 20, 15, 10.'),
  q(79, 7, 'TWO_STEP', 'Total scoops = 36. Chocolate=14, Vanilla=10. Strawberry=?', ['12', '24', '36', '4'], '12', '36-14-10=12.', 'Subtract known from total.', '36-14-10=?'),
  q(80, 7, 'BOSS', 'Key: 1 🍦 = 4. Choco:5, Vanilla:4, Straw:3, Mint:6, Mango:2. Total?', ['80', '20', '60', '100'], '80', '(5+4+3+6+2)×4=20×4=80.', 'Sum pictures, multiply by key.', '20×4=?'),

  // ── DISTRICT 8: TRANSPORT TOWN (81-90) ───────────────────────────────────
  q(81, 8, 'READ_KEY', 'Key: 1 🚗 = 5 vehicles. Car row: 4 pictures. How many cars passed?', ['20', '9', '4', '15'], '20', '4×5=20.', 'Multiply pictures by key.', '4×5=?'),
  q(82, 8, 'MOST_LEAST', 'Cars=20, Buses=10, Bikes=15, Trucks=5. Most common vehicle?', ['Cars', 'Bikes', 'Buses', 'Trucks'], 'Cars', 'Cars=20, the highest.', 'Find the largest number.', '20 is the biggest.'),
  q(83, 8, 'FIND_TOTAL', 'Cars=20, Buses=10, Bikes=15. Total vehicles?', ['45', '40', '35', '50'], '45', '20+10+15=45.', 'Add all values.', '20+10+15=?'),
  q(84, 8, 'FIND_DIFFERENCE', 'Cars=20, Trucks=5. How many more cars?', ['15', '25', '5', '20'], '15', '20-5=15.', 'Subtract.', '20-5=?'),
  q(85, 8, 'COUNT_CATEGORY', 'Key: 1 🚌 = 3. Bus row: 5 pictures. Total buses?', ['15', '8', '5', '30'], '15', '5×3=15.', 'Multiply pictures by key.', '5×3=?'),
  q(86, 8, 'IDENTIFY_KEY', '10 pictures for Scooters, total = 20. Key?', ['1 picture = 2', '1 picture = 10', '1 picture = 20', '1 picture = 5'], '1 picture = 2', '20÷10=2.', 'Divide total by pictures.', '20÷10=?'),
  q(87, 8, 'MORE_FEWER', 'Taxi: 3 pics, Van: 5 pics. Key=4. Which has more and by how much?', ['Van, by 8', 'Taxi, by 8', 'Van, by 2', 'Equal'], 'Van, by 8', 'Van: 5×4=20, Taxi: 3×4=12. 20-12=8.', 'Calculate totals, subtract.', '20-12=?'),
  q(88, 8, 'ORDER', 'Plane=6, Train=18, Ship=12, Car=24. Least to most?', ['Plane, Ship, Train, Car', 'Car, Train, Ship, Plane', 'Plane, Train, Ship, Car', 'Ship, Plane, Train, Car'], 'Plane, Ship, Train, Car', '6<12<18<24.', 'Smallest to largest.', '6, 12, 18, 24.'),
  q(89, 8, 'TWO_STEP', 'Total vehicles = 50. Cars=20, Buses=15. Others=?', ['15', '35', '50', '5'], '15', '50-20-15=15.', 'Subtract known from total.', '50-20-15=?'),
  q(90, 8, 'BOSS', 'Key: 1 🚗 = 10. Cars:3, Buses:2, Bikes:5, Trucks:4, Vans:1. Total?', ['150', '15', '100', '200'], '150', '(3+2+5+4+1)×10=15×10=150.', 'Sum, multiply by key.', '15×10=?'),

  // ── DISTRICT 9: PICTO CITADEL (91-100) ───────────────────────────────────
  q(91, 9, 'READ_KEY', 'Key: 1 ⭐ = 4 points. Star row: 8 pictures. Total points?', ['32', '12', '8', '24'], '32', '8×4=32.', 'Multiply pictures by key.', '8×4=?'),
  q(92, 9, 'MOST_LEAST', 'Team A=32, Team B=24, Team C=28, Team D=20. Which team scored MOST?', ['Team A', 'Team C', 'Team B', 'Team D'], 'Team A', 'Team A=32, the highest.', 'Find the largest value.', '32 is the biggest.'),
  q(93, 9, 'FIND_TOTAL', 'Team A=32, Team B=24, Team C=28. Grand total?', ['84', '80', '72', '88'], '84', '32+24+28=84.', 'Add all scores.', '32+24+28=?'),
  q(94, 9, 'FIND_DIFFERENCE', 'Team A=32, Team D=20. Difference?', ['12', '52', '20', '32'], '12', '32-20=12.', 'Subtract smaller from larger.', '32-20=?'),
  q(95, 9, 'COUNT_CATEGORY', 'Key: 1 ⭐ = 5. Trophy row: 6 pictures. Total trophies?', ['30', '11', '6', '25'], '30', '6×5=30.', 'Multiply pictures by key.', '6×5=?'),
  q(96, 9, 'IDENTIFY_KEY', '8 pictures for Team E, total = 40 points. Key?', ['1 picture = 5', '1 picture = 8', '1 picture = 40', '1 picture = 4'], '1 picture = 5', '40÷8=5.', 'Divide total by pictures.', '40÷8=?'),
  q(97, 9, 'TWO_STEP', 'Grand tournament total = 100 points. Team A=35, Team B=25, Team C=?', ['40', '60', '100', '10'], '40', '100-35-25=40.', 'Subtract known from total.', '100-35-25=?'),
  q(98, 9, 'MORE_FEWER', 'Gold: 5 pictures, Silver: 8 pictures. Key=3. Which has more and by how much?', ['Silver, by 9', 'Gold, by 9', 'Silver, by 3', 'Equal'], 'Silver, by 9', 'Gold: 5×3=15, Silver: 8×3=24. 24-15=9.', 'Calculate totals, subtract.', '24-15=?'),
  q(99, 9, 'ORDER', 'Ruby=18, Emerald=30, Sapphire=24, Diamond=36. Least to most?', ['Ruby, Sapphire, Emerald, Diamond', 'Diamond, Emerald, Sapphire, Ruby', 'Ruby, Emerald, Sapphire, Diamond', 'Sapphire, Ruby, Emerald, Diamond'], 'Ruby, Sapphire, Emerald, Diamond', '18<24<30<36.', 'Smallest to largest.', '18, 24, 30, 36.'),
  q(100, 9, 'BOSS', 'FINAL BOSS! Key: 1 ⭐ = 5. Teams: Alpha:6, Beta:4, Gamma:5, Delta:3, Omega:7. Total points across all teams?', ['125', '25', '100', '150'], '125', '(6+4+5+3+7)×5=25×5=125.', 'Sum all pictures, multiply by key.', '25×5=?'),
];

export default RAW_QUESTIONS;
