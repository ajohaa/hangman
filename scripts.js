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
let category = getRandomCategory();
let word = getRandomWord(category);

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
   ERRORS DISPLAY
   ====================================================== */

// i'm pasting stuff from another project i did because i kinda need to do something similar

const WRONG = "❌";

const displayErrors = (count) => WRONG.repeat(count);

let numberOfTurns = 0;

// Update the heart display on screen

const updateHpDisplay = () => {
  document.getElementById("lives").textContent = displayErrors(
    wrongGuesses.length,
  );
};

/* ======================================================
   DIFFICULTY BUTTONS
   ====================================================== */

// adjusted the code from the same previous project

const easyBtn = document.getElementById("easy");
const mediumBtn = document.getElementById("medium");
const hardBtn = document.getElementById("hard");

// also need to make sure that when the player clicks a difficulty button, the game restarts with the new settings (new word, new category, reset wrong guesses, etc.)
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

// need to update logic so that depending on difficulty, the number of wrong guesses until game over changes, and set a maximum of allowed wrong guesses for each difficulty level.

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
   WORD DISPLAY
   ====================================================== */

let wrongGuesses = [];
let guessedLetters = [];

function displayWord() {
  let display = "";

  for (let i = 0; i < word.length; i++) {
    display += "_ ";
  }

  document.getElementById("word").textContent = display.trim();
}

function pressLetter(letter) {
  let display = "";

  // when the player clicks a letter on the keyboard, put that letter into an array guessedLetters
  if (!guessedLetters.includes(letter)) {
    guessedLetters.push(letter);
  }

  console.log(guessedLetters);

  // If the letter is not in the word, add it to the wrongGuesses array
  if (!word.includes(letter) && !wrongGuesses.includes(letter)) {
    wrongGuesses.push(letter);
    lifeLost();
  }

  for (let i = 0; i < word.length; i++) {
    let wordLetter = word.charAt(i);

    // Check if this letter exists in the guessedLetters array
    if (guessedLetters.includes(wordLetter)) {
      // If the letter has been guessed,
      // add the letter to the display string
      display += wordLetter + " ";
    } else {
      // If the letter has NOT been guessed,
      // add an underscore instead
      display += "_ ";
    }
  }

  // Update the word display on the page
  document.getElementById("word").textContent = display.trim();
}

function lifeLost() {
  updateHpDisplay();
}

/* ======================================================
   GAME START / INITIALIZATION
   ====================================================== */

function startGame() {
  wrongGuesses = [];
  guessedLetters = [];
  displayWord();
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
  pressLetter(letter);
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
