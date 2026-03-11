const categories =  ['Produce', 'Sports', 'Animals', 'Countries', 'Colors', 'Instruments', 'Office', 'Beach', 'Space', 'Transportation', 'School'];
// choose a random category from the list when the player starts a new game
function getRandomCategory() {
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
}

// list of words for each category. 10 words for each (because i'm extra like that)
const wordBank = {
    'Produce': ['grapefruit', 'cauliflower', 'zucchini', 'raspberry', 'cucumber', 'asparagus', 'radish', 'cantaloupe', 'eggplant'],
    'Sports': ['gymnastics', 'basketball', 'skateboarding', 'baseball', 'badminton', 'snowboarding', 'archery', 'volleyball', 'swimming', 'lacrosse'],
    'Animals': ['jaguar', 'capybara', 'elephant', 'hippopotamus', 'rhinoceros', 'giraffe', 'kangaroo', 'tortoise', 'orangutan', 'anteater'],
    'Countries': ['iceland', 'portugal', 'netherlands', 'macedonia', 'switzerland', 'madagascar', 'cambodia', 'nicaragua', 'nigeria', 'luxembourg'],
    'Colors': ['crimson', 'magenta', 'periwinkle', 'lavender', 'vermilion', 'turquoise', 'chartreuse', 'ultramarine', 'cerulean', 'fuchsia'],
    'Instruments': ['clarinet', 'saxophone', 'bagpipes', 'xylophone', 'synthesizer', 'accordion', 'trombone', 'harpsichord', 'marimba', 'castanets'],
    'Office': ['cabinet', 'paperclip', 'desktop', 'printer', 'telephone', 'stapler', 'whiteboard', 'calculator', 'envelope', 'clipboard'],
    'Beach': ['seagulls', 'flipflops', 'boardwalk', 'seashells', 'inflatables', 'lifeguard', 'sandcastle', 'surfboard', 'tidepool', 'sunscreen'],
    'Space': ['asteroids', 'nebulae', 'constellation', 'supernova', 'heliocentric', 'cosmonaut', 'meteorite', 'telescope', 'blackhole', 'andromeda'],
    'Transportation': ['motorcycle', 'submarine', 'rollerblades', 'automobile', 'helicopter', 'bicycle', 'monorail', 'sailboat', 'airplane', 'carriage'],
    'School': ['professor', 'stationery', 'protractor', 'smartboard', 'dictionary', 'bookshelf', 'backpack', 'highlighter', 'textbook', 'sharpener']
};

// get a random word from the corresponding category when the player starts a new game
function getRandomWord(category) {
    const words = wordBank[category];
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}


// difficulty levels and their corresponding number of allowed incorrect guesses
const difficultyLevels = {
    'Easy': 8,
    'Medium': 6,
    'Hard': 4
};

// i'm pasting stuff from another project i did because i kinda need to do something similar
// I NEED THE FREAKING LIVES TO SET TO THE NUMBER OF TURNS BASED ON THE DIFFICULTY 

const HEART = "\u2764\ufe0f";

const makeHearts = (count) => HEART.repeat(count);

let numberOfTurns = 0;

const easyBtn = document.getElementById("easy");
if (easyBtn) {
  easyBtn.addEventListener("click", function () {
    numberOfTurns = 8;
    localStorage.setItem("difficulty", "8");
  });
}

const mediumBtn = document.getElementById("medium");
if (mediumBtn) {
  mediumBtn.addEventListener("click", function () {
    numberOfTurns = 6;
    localStorage.setItem("difficulty", "6");
  });
}

const hardBtn = document.getElementById("hard");
if (hardBtn) {
  hardBtn.addEventListener("click", function () {
    numberOfTurns = 4;
    localStorage.setItem("difficulty", "4");
  });
}

const updateHpDisplay = () => {
  document.getElementById("lives").textContent = makeHearts(numberOfTurns);
}

// when the player clicks the hint button, it should show the category of the word right above it.

const hintBtn = document.getElementById('hint-btn');
const hintElement = document.getElementById('hint-element');
const hint = document.getElementById('category-name');

hintBtn.addEventListener('click', function() {
  // Set the text content of the element to the random category
  hint.textContent = getRandomCategory();
  // Toggle the 'is-visible' class on the element
  hintElement.classList.toggle('is-visible');
});

// make it unclickable after the first click (because otherwise you could just keep clicking it to get the category name)

hintBtn.addEventListener('click', function() {
    hint.textContent = getRandomCategory();
  hintBtn.disabled = true; // Disable the button after the first click
  hintElement.style.display = 'block'; // Show the hint
});

// 
function wordDisplay(word) {
    const wordContainer = document.getElementById("word");
    wordContainer.innerHTML = ""; // Clear previous word display

}
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
}

// call the startGame function when the player clicks on a difficulty button, and also when the page loads so that the game starts with the correct number of lives based on the saved difficulty level

document.addEventListener("DOMContentLoaded", function() {
    startGame();
});

easyBtn.addEventListener("click", function() {
    startGame();
});

mediumBtn.addEventListener("click", function() {
    startGame();
});

hardBtn.addEventListener("click", function() {
    startGame();
});