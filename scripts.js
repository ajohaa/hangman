/* ======================================================
   CATEGORY + WORD DATA
   ====================================================== */

// Categories list
const categories = ["Produce", "Sports", "Animals", "Countries", "Colors", "Instruments", "Office", "Beach", "Space", "Transportation", "School"];

// list of words for each category. 10 words for each (because i'm extra like that)
const wordBank = {
  'Produce': ['GRAPEFRUIT', 'CAULIFLOWER', 'ZUCCHINI', 'RASPBERRY', 'CUCUMBER', 'ASPARAGUS', 'RADISH', 'CANTALOUPE', 'EGGPLANT'],
  'Sports': ['GYMNASTICS', 'BASKETBALL', 'SKATEBOARDING', 'BASEBALL', 'BADMINTON', 'SNOWBOARDING', 'ARCHERY', 'VOLLEYBALL', 'SWIMMING', 'LACROSSE'],
  'Animals': ['JAGUAR', 'CAPYBARA', 'ELEPHANT', 'HIPPOPOTAMUS', 'RHINOCEROS', 'GIRAFFE', 'KANGAROO', 'TORTOISE', 'ORANGUTAN', 'ANTEATER'],
  'Countries': ['ICELAND', 'PORTUGAL', 'NETHERLANDS', 'MACEDONIA', 'SWITZERLAND', 'MADAGASCAR', 'CAMBODIA', 'NICARAGUA', 'NIGERIA', 'LUXEMBOURG'],
  'Colors': ['CRIMSON', 'MAGENTA', 'PERIWINKLE', 'LAVENDER', 'VERMILION', 'TURQUOISE', 'CHARTREUSE', 'ULTRAMARINE', 'CERULEAN', 'FUCHSIA'],
  'Instruments': ['CLARINET', 'SAXOPHONE', 'BAGPIPES', 'XYLOPHONE', 'SYNTHESIZER', 'ACCORDION', 'TROMBONE', 'HARPSICHORD', 'MARIMBA', 'CASTANETS'],
  'Office': ['CABINET', 'PAPERCLIP', 'DESKTOP', 'PRINTER', 'TELEPHONE', 'STAPLER', 'WHITEBOARD', 'CALCULATOR', 'ENVELOPE', 'CLIPBOARD'],
  'Beach': ['SEAGULLS', 'FLIPFLOPS', 'BOARDWALK', 'SEASHELLS', 'INFLATABLES', 'LIFEGUARD', 'SANDCASTLE', 'SURFBOARD', 'TIDEPool', 'SUNSCREEN'],
  'Space': ['ASTEROIDS', 'NEBULAE', 'CONSTELLATION', 'SUPERNOVA', 'HELIOCENTRIC', 'COSMONAUT', 'METEORITE', 'TELESCOPE', 'BLACKHOLE', 'ANDROMEDA'],
  'Transportation': ['MOTORCYCLE', 'SUBMARINE', 'ROLLERBLADES', 'AUTOMOBILE', 'HELICOPTER', 'BICYCLE', 'MONORAIL', 'SAILBOAT', 'AIRPLANE', 'CARRIAGE'],
  'School': ['PROFESSOR', 'STATIONERY', 'PROTRACTOR', 'SMARTBOARD', 'DICTIONARY', 'BOOKSHELF', 'BACKPACK', 'HIGHLIGHTER', 'TEXTBOOK', 'SHARPENER']
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
  hint.textContent = category;
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
  if (wrongGuesses.length >= numberOfTurns) {
  return;
}

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
   if (wrongGuesses.length >= numberOfTurns) {
    gameOver();
  }
}

/* ======================================================
   GAME START / INITIALIZATION
   ====================================================== */

function startGame() {
  wrongGuesses = [];
  guessedLetters = [];
// hide hint, reset hint button, and choose a new random category and word
  hintElement.classList.remove("is-visible");
  hintBtn.disabled = false;
  category = getRandomCategory();
  word = getRandomWord(category);
  displayWord();
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
   GAME OVER
   ====================================================== */

function gameOver() {
  alert(`Game Over! The word was: ${word}`);
  startGame();
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
