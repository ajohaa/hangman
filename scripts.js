/* ======================================================
   CATEGORY + WORD DATA
   ====================================================== */

// Categories list
const categories = [
  "Produce",
  "Sports",
  "Animals",
  "Countries",
  "Colors",
  "Instruments",
  "Office",
  "Beach",
  "Space",
  "Transportation",
  "School",
];

// list of words for each category. 10 words for each (because i'm extra like that)
const wordBank = {
  Produce: [
    "grapefruit",
    "cauliflower",
    "zucchini",
    "raspberry",
    "cucumber",
    "asparagus",
    "radish",
    "cantaloupe",
    "eggplant",
  ],
  Sports: [
    "gymnastics",
    "basketball",
    "skateboarding",
    "baseball",
    "badminton",
    "snowboarding",
    "archery",
    "volleyball",
    "swimming",
    "lacrosse",
  ],
  Animals: [
    "jaguar",
    "capybara",
    "elephant",
    "hippopotamus",
    "rhinoceros",
    "giraffe",
    "kangaroo",
    "tortoise",
    "orangutan",
    "anteater",
  ],
  Countries: [
    "iceland",
    "portugal",
    "netherlands",
    "macedonia",
    "switzerland",
    "madagascar",
    "cambodia",
    "nicaragua",
    "nigeria",
    "luxembourg",
  ],
  Colors: [
    "crimson",
    "magenta",
    "periwinkle",
    "lavender",
    "vermilion",
    "turquoise",
    "chartreuse",
    "ultramarine",
    "cerulean",
    "fuchsia",
  ],
  Instruments: [
    "clarinet",
    "saxophone",
    "bagpipes",
    "xylophone",
    "synthesizer",
    "accordion",
    "trombone",
    "harpsichord",
    "marimba",
    "castanets",
  ],
  Office: [
    "cabinet",
    "paperclip",
    "desktop",
    "printer",
    "telephone",
    "stapler",
    "whiteboard",
    "calculator",
    "envelope",
    "clipboard",
  ],
  Beach: [
    "seagulls",
    "flipflops",
    "boardwalk",
    "seashells",
    "inflatables",
    "lifeguard",
    "sandcastle",
    "surfboard",
    "tidepool",
    "sunscreen",
  ],
  Space: [
    "asteroids",
    "nebulae",
    "constellation",
    "supernova",
    "heliocentric",
    "cosmonaut",
    "meteorite",
    "telescope",
    "blackhole",
    "andromeda",
  ],
  Transportation: [
    "motorcycle",
    "submarine",
    "rollerblades",
    "automobile",
    "helicopter",
    "bicycle",
    "monorail",
    "sailboat",
    "airplane",
    "carriage",
  ],
  School: [
    "professor",
    "stationery",
    "protractor",
    "smartboard",
    "dictionary",
    "bookshelf",
    "backpack",
    "highlighter",
    "textbook",
    "sharpener",
  ],
};

/* ======================================================
   RANDOM CATEGORY + WORD FUNCTIONS
   ====================================================== */

// Choose a random category when the player starts a new game
function getRandomCategory() {
  const randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
}

// Choose a random word from the selected category
function getRandomWord(category) {
  const words = wordBank[category];
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

// Initial selections
const category = getRandomCategory();
const word = getRandomWord(category);

/* ======================================================
   DIFFICULTY SETTINGS
   ====================================================== */

// Difficulty levels and allowed incorrect guesses
const difficultyLevels = {
  Easy: 8,
  Medium: 6,
  Hard: 4,
};

/* ======================================================
   LIVES / HEART DISPLAY
   ====================================================== */

const HEART = "\u2764\ufe0f";

const makeHearts = (count) => HEART.repeat(count);

let numberOfTurns = 0;

// Update the heart display on screen

const updateHpDisplay = () => {
  document.getElementById("lives").textContent = makeHearts(numberOfTurns);
};

/* ======================================================
   DIFFICULTY BUTTONS
   ====================================================== */

const easyBtn = document.getElementById("easy");
const mediumBtn = document.getElementById("medium");
const hardBtn = document.getElementById("hard");

if (easyBtn) {
  easyBtn.addEventListener("click", function () {
    numberOfTurns = 8;
    localStorage.setItem("difficulty", "8");
  });
}

if (mediumBtn) {
  mediumBtn.addEventListener("click", function () {
    numberOfTurns = 6;
    localStorage.setItem("difficulty", "6");
  });
}

if (hardBtn) {
  hardBtn.addEventListener("click", function () {
    numberOfTurns = 4;
    localStorage.setItem("difficulty", "4");
  });
}

/* ======================================================
   HINT SYSTEM
   ====================================================== */

const hintBtn = document.getElementById("hint-btn");
const hintElement = document.getElementById("hint-element");
const hint = document.getElementById("category-name");

// When the player clicks the hint button,
// show the category of the word above it
hintBtn.addEventListener("click", function () {
  // Show category
  hint.textContent = category;

  // Toggle visibility
  hintElement.classList.toggle("is-visible");
});

// Disable hint after first click
hintBtn.addEventListener("click", function () {
  hint.textContent = getRandomCategory();
  hintBtn.disabled = true;

  // Show hint
  hintElement.style.display = "block";
});

/* ======================================================
   WORD DISPLAY (UNDERSCORES)
   ====================================================== */

function wordDisplay() {
  const chosenWord = document.getElementById("word");
  chosenWord.textContent = ""; // clear previous word display

  // create an underscore for each letter in the word
  for (let i = 0; i < word.length; i++) {
    chosenWord.textContent += "_ ";
  }
}

/* ======================================================
   WORD DISPLAY (LETTERS)
   ====================================================== */

   // when the player clicks a letter, check if it's in the word. Check if userLetter equals any letter in the word. then show the designated letters in their correct positions. Use a loop. If there are no matches, call a function to subtract a life. I'll write this later.
function revealLetter(userLetter) {
  const chosenWord = document.getElementById("word");
  const wordArray = chosenWord.textContent.split(" ");
  for (let i = 0; i< word.length; i++) {
    if (userLetter === word[i]) {
      wordArray[i] = userLetter;
    } else {
      // try the next letter in the word. End when all letters have been checked. No matches? Call lifeLost() function to subtract a life.
    }
  }
  chosenWord.textContent = wordArray.join(" ");
}

function lifeLost() {
  numberOfTurns--;
  updateHpDisplay();
}

/* ======================================================
   GAME START / INITIALIZATION
   ====================================================== */

function startGame() {
  getRandomCategory();
  const savedDifficulty = localStorage.getItem("difficulty");
  if (savedDifficulty === "8") {
    numberOfTurns = 8;
  } else if (savedDifficulty === "6") {
    numberOfTurns = 6;
  } else if (savedDifficulty === "4") {
    numberOfTurns = 4;
  }
  lives = numberOfTurns;
  updateHpDisplay();
  wordDisplay();
}

/* ======================================================
   EVENT LISTENERS
   ====================================================== */

// Start game when page loads
document.addEventListener("DOMContentLoaded", function () {
  startGame();
});

// Restart game when difficulty is selected
easyBtn.addEventListener("click", function () {
  startGame();
});

mediumBtn.addEventListener("click", function () {
  startGame();
});

hardBtn.addEventListener("click", function () {
  startGame();
});
