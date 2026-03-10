const categories =  ['Produce', 'Sports', 'Animals', 'Countries', 'Colors', 'Instruments', 'Office', 'Beach', 'Space', 'Transportation', 'School'];
// choose a random category from the list when the player starts a new game
function getRandomCategory() {
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
}

// get the category element and set its text to the random category
const categoryElement = document.getElementById('category');
categoryElement.textContent = getRandomCategory();

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

// get a random word from the corresponding category


// difficulty levels and their corresponding number of allowed incorrect guesses
const difficultyLevels = {
    'Easy': 8,
    'Medium': 6,
    'Hard': 4
};

function startGame() {
    
}