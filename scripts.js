const gameModal = document.querySelector(".game-modal");

/* this is AI, just for carousel arrow styles.
Has no impact on the actual game itself.*/

const carousel = document.querySelector('#tutorialCarousel');
const prevBtn = document.querySelector('.carousel-control-prev');
const nextBtn = document.querySelector('.carousel-control-next');
const totalSlides = document.querySelectorAll('.carousel-item').length;

// update arrow states
function updateArrows(index) {
  // prev button
  if (index === 0) {
    prevBtn.style.opacity = "0.3";
    prevBtn.style.pointerEvents = "none";
  } else {
    prevBtn.style.opacity = "1";
    prevBtn.style.pointerEvents = "auto";
  }

  // next button
  if (index === totalSlides - 1) {
    nextBtn.style.opacity = "0.3";
    nextBtn.style.pointerEvents = "none";
  } else {
    nextBtn.style.opacity = "1";
    nextBtn.style.pointerEvents = "auto";
  }
}

if (carousel && prevBtn && nextBtn && totalSlides > 0) {
  // update when slide changes
  carousel.addEventListener('slid.bs.carousel', (event) => {
    updateArrows(event.to);
  });

  // run once on page load
  window.addEventListener('load', () => {
    updateArrows(0);
  });
}

/* end of AI code */

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
  'Beach': ['SEAGULLS', 'FLIPFLOPS', 'BOARDWALK', 'SEASHELLS', 'INFLATABLES', 'LIFEGUARD', 'SANDCASTLE', 'SURFBOARD', 'TIDEPOOL', 'SUNSCREEN'],
  'Space': ['ASTEROIDS', 'NEBULAE', 'CONSTELLATION', 'SUPERNOVA', 'HELIOCENTRIC', 'COSMONAUT', 'METEORITE', 'TELESCOPE', 'BLACKHOLE', 'ANDROMEDA'],
  'Transportation': ['MOTORCYCLE', 'SUBMARINE', 'ROLLERBLADES', 'AUTOMOBILE', 'HELICOPTER', 'BICYCLE', 'MONORAIL', 'SAILBOAT', 'AIRPLANE', 'CARRIAGE'],
  'School': ['PROFESSOR', 'STATIONERY', 'PROTRACTOR', 'SMARTBOARD', 'DICTIONARY', 'BOOKSHELF', 'BACKPACK', 'HIGHLIGHTER', 'TEXTBOOK', 'SHSARPENER']
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


// learned for of loop from w3schools
// link: https://www.w3schools.com/js/js_loop_forof.asp

const displayErrors = () => {

  let errorDisplay = "";

  for (let guess of wrongGuesses) {

    if (guess === "HINT") {
      errorDisplay += "💡";
    } else {
      errorDisplay += "❌";
    }
  }
  return errorDisplay;
};

const updateHpDisplay = () => {
  const livesEl = document.getElementById("lives");
  if (!livesEl) return;
  const errorsText = displayErrors(wrongGuesses);
  if (errorsText.length === 0) {
    // Keep space reserved without showing content
    livesEl.textContent = "\u00A0";
    livesEl.classList.remove("is-visible");
    livesEl.classList.remove("bump");
    return;
  }
  livesEl.textContent = errorsText;
  livesEl.classList.add("is-visible");
  livesEl.classList.remove("bump");
  void livesEl.offsetWidth; // reflow to restart animation
  livesEl.classList.add("bump");
}

/* ======================================================
  DIFFICULTY BUTTONS
  ====================================================== */

// adjusted the code from the same previous project

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
if (hintBtn && hintElement && hint) {
  hintBtn.addEventListener("click", function () {

    // Show the actual category
    hint.textContent = category;

    // Show hint
    hintElement.classList.add("is-visible");

    // Disable after one use
    hintBtn.disabled = true;

    // Use up one guess (acts like a wrong guess)
    if (wrongGuesses.length < numberOfTurns) {
      wrongGuesses.push("HINT");
      lifeLost();
    }

  });
}

/* ======================================================
  WORD DISPLAY
  ====================================================== */

const hangmanImage = document.querySelector(".hangman-box img");

let wrongGuesses = [];
let guessedLetters = [];

function displayWord() {
  let display = "";

  for (let i = 0; i < word.length; i++) {
    display += "_ ";
  }

  const wordEl = document.getElementById("word");
  if (wordEl) {
    wordEl.textContent = display.trim();
  }
}

function pressLetter(letter, button) {

  // prevent clicking again
  if (button) {
    button.disabled = true;
  }

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
  const wordEl = document.getElementById("word");
  if (wordEl) {
    wordEl.textContent = display.trim();
  }

  // Check for victory or defeat after each guess
  const isVictory = wordEl ? !wordEl.textContent.includes("_") : false;
  const isDefeat = wrongGuesses.length >= numberOfTurns;
  if (isVictory) {
    gameOver(true);
  } else if (isDefeat) {
    gameOver(false);
  }
}

function lifeLost() {
  updateHpDisplay();
  // update the hangman image
  if (hangmanImage) {
    hangmanImage.src = `hangman-${wrongGuesses.length}.svg`;
  }
}

/* ======================================================
  GAME START / INITIALIZATION
  ====================================================== */

function startGame() {
  wrongGuesses = [];
  guessedLetters = [];

  const keys = document.querySelectorAll(".key");

  keys.forEach(function (key) {
    key.disabled = false;
  });

  if (hangmanImage) {
    hangmanImage.src = `hangman-0.svg`;
  }
  // hide hint, reset hint button, and choose a new random category and word
  if (hintElement) {
    hintElement.classList.remove("is-visible");
  }
  if (hintBtn) {
    hintBtn.disabled = false;
  }
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
}

/* ======================================================
  GAME MODAL (from coding nepal)
  ====================================================== */

const gameOver = (isVictory) => {
  setTimeout(() => {
    if (!gameModal) return;
    const modalText = isVictory ? "You guessed the word:" : `The correct word was:`;
    gameModal.querySelector("img").src = isVictory ? "victory.gif" : "lost.gif";
    gameModal.querySelector("h2").innerText = `${isVictory ? "Congratulations!" : "Game Over!"}`;
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${word}</b>`;
    gameModal.classList.add("show");

    const playAgainBtn = document.querySelector(".play-again");
    if (playAgainBtn) {
      playAgainBtn.onclick = () => {
        gameModal.classList.remove("show");
        startGame();
      };
    }
  }, 300); // Delay to allow the last guess to be seen (searched this up)
}


/* ======================================================
  EVENT LISTENERS
  ====================================================== */

// Start game when page loads
document.addEventListener("DOMContentLoaded", function () {
  const hasGameUi = document.getElementById("word") && hangmanImage;
  if (hasGameUi) {
    startGame();
  }
});

// Restart game when difficulty is selected
if (easyBtn) {
  easyBtn.addEventListener("click", function () {
    startGame();
  });
}

if (mediumBtn) {
  mediumBtn.addEventListener("click", function () {
    startGame();
  });
}

if (hardBtn) {
  hardBtn.addEventListener("click", function () {
    startGame();
  });
}
