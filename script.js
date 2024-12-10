const levels = {
    1: ["cats", "dogs", "fish"],
    2: ["apple", "orange", "happy"],
    3: ["window", "computer", "garden"],
    4: ["fantastic", "reliable", "adventure"],
    5: ["extraordinary", "sophisticated", "unbelievable"]
};

let score = 0;
let wordsTyped = 0;
let currentLevel = 1;
let asteroids = [];
let gameStarted = false;

const startScreen = document.getElementById("start-screen");
const gameContainer = document.getElementById("game-container");
const wordInput = document.getElementById("word-input");
const scoreDisplay = document.getElementById("score");
const levelDisplay = document.getElementById("level");
const wordsTypedDisplay = document.getElementById("words-typed");
const asteroidContainer = document.getElementById("asteroid-container");
const startButton = document.getElementById("start-button");

startButton.addEventListener("click", ()=>{
    startScreen.classList.add("hidden");
    gameContainer.classList.remove("hidden");

    gameStarted = true;
    gameLoop();
});

wordInput.addEventListener("input", checkWord);

function spawnAsteroid() {
    const wordList = levels[currentLevel];
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    const asteroidSize = `asteroid${Math.min(currentLevel, 5)}.png`;

    // Create a container for asteroid and word
    const asteroidContainer = document.createElement("div");
    asteroidContainer.classList.add("asteroid-container");
    asteroidContainer.style.left = `${Math.random() * 90}%`;

    // Create the asteroid image
    const asteroid = document.createElement("img");
    asteroid.src = `resources/${asteroidSize}`;
    asteroid.classList.add("asteroid");
    asteroid.dataset.word = randomWord; // Attach word to asteroid

    // Create the word text
    const wordText = document.createElement("div");
    wordText.classList.add("asteroid-word");
    wordText.textContent = randomWord;

    // Append word and asteroid to the container
    asteroidContainer.appendChild(wordText);
    asteroidContainer.appendChild(asteroid);

    // Add the container to the game area
    document.getElementById("asteroid-container").appendChild(asteroidContainer);

    // Start moving the asteroid
    moveAsteroid(asteroidContainer);
}


function checkWord() {
    const inputWord = wordInput.value.toLowerCase();
    const asteroids = document.querySelectorAll('.asteroid');

    asteroids.forEach((asteroid) => {
        if (asteroid.dataset.word.toLowerCase() === inputWord) {
            score += 10;
            wordsTyped++;
            updateScore();
            updateWordsTyped();
            checkLevelUp();
            asteroid.remove();
            wordInput.value = "";
        };
    });
}

function moveAsteroid(asteroid, word) {
    let asteroidBottom = 0;
    let interval = setInterval(() => {
        asteroidBottom += 5;
        asteroid.style.bottom = `${asteroidBottom}px`;

        if (asteroidBottom > window.innerHeight) {
            clearInterval(interval);
            asteroid.remove()
        }
    }, 100);

    asteroid.addEventListener("click", ()=>{
        if (wordInput.value.toLowerCase() === word.toLowerCase()) {
            score += 10;
            wordsTyped +=1;
            updateScore();
            updateWordsTyped();
            checkLevelUp();
            asteroid.remove();
        }
    });
}

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

function updateWordsTyped() {
    wordsTypedDisplay.textContent = `Words Typed: ${wordsTyped}/15`;
}

function checkLevelUp() {
    if (wordsTyped >= 15){
        wordsTyped = 0;
        currentLevel++;
        if (currentLevel > 5) currentLevel = 5;
        levelDisplay.textContent = `Level: ${currentLevel}`;
        updateAsteroids();
    }
}

function updateAsteroids() {
    asteroids = [];
    const asteroidCount = 5 * currentLevel;
    for (let i=0; i<asteroidCount; i++) {
        spawnAsteroid();
    }
}

function gameLoop() {
    if (gameStarted) {
        setInterval(() => {
            spawnAsteroid();
        }, 1500);
    }
}