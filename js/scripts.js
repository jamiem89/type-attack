// Grab elements and set variables
const introContain = document.querySelector(`.intro-container`);
const startGame = document.querySelector(`#begin`);
const restartGame = document.querySelector(`#restart`);
const gameContain = document.querySelector(`.game-container`)
const endContain = document.querySelector(`.end-container`)
const currentWordEl = document.querySelector(`#currentWord`);
const currentLevelEl = document.querySelector
(`#currentLevel`);
const shareLink = document.querySelector(`#share`);
let currentLevel = 0;
let currentLetter = 0;
let currentChar = 0;
let words = [];
let word = '';
let gameTimerInterval;

// Timer elements
const timerEl = document.querySelector(`#timer`);
const timerResult = document.querySelector(`#timerResult`);
let milliseconds = 0;

// Start the game
function initGame() {
    currentLevel = 0;
    currentStage = 0;
    currentChar = 0;
    milliseconds = 0;
    word = [];
    introContain.classList.add(`disabled`);
    gameContain.classList.remove(`disabled`);
    endContain.classList.add(`disabled`);
    initLevel();
    gameTimerInterval = setInterval(gameTimer, 10);
}

function initLevel() {
    words = [];

    if(currentLevel == 0) {
        words = [
            `cat`,
            `dog`,
            `cow`,
            `pig`,
            `sheep`,
        ]
        currentLevelEl.textContent = `${currentLevel + 1} – Animals`;
    } else if (currentLevel == 1) {
        words =[
            `england`,
            `china`,
            `japan`,
            `france`,
            `brazil`,
        ]
        currentLevelEl.textContent = `${currentLevel + 1} – Countries`;
    }  else if (currentLevel == 2) {
        words =[
            `asparagus`,
            `wagyu`,
            `papaya`,
            `carambola`,
            `calamansi`,
        ]
        currentLevelEl.textContent = `${currentLevel + 1} – Food`;
    } else if (currentLevel == 3) {
        words =[
            `sergeant`,
            `tyranny`,
            `necessary`,
            `dilemma`,
            `guarantee`,
        ]
        currentLevelEl.textContent = `${currentLevel + 1} – Shitty words`;
    }

    else {
        console.log(`Congrats, you completed it`);
        gameCompleted();
        return;
    }

    initStage();
}

function initStage() {
    // Clear previous word
    currentWord.innerHTML = '';
    // Create array based on current stage index
    wordArray = words[currentStage].split("");

    wordArray.forEach(function(letter) {
        let span = document.createElement(`span`);
        span.textContent = letter;
        currentWord.appendChild(span);
    });

}

function typeCheck(e) {
    spans = document.querySelectorAll(`#currentWord span`);
    if(e.key == wordArray[currentLetter]) {
        // Start timer
        console.log(`Progress Letter`);
        spans.item(currentLetter).classList.remove(`incorrect`);
        spans.item(currentLetter).classList.add(`correct`);
        // Progress letter if key press is correct
        currentLetter ++;
    } else {
        spans.item(currentLetter).classList.add(`incorrect`);

    }

    // Check to change stage or level
    if(currentLetter >= wordArray.length) {
        currentLetter = 0;
        if (currentStage >= words.length - 1) {
            currentLevel ++;
            currentStage = 0;
            console.log(`Progress level`);
            initLevel();
        } else {
            currentStage ++;
            console.log(`Progress word`);
            initStage();
        }
    }
}

function gameTimer() {
    milliseconds ++;
    currentTime = (milliseconds/100).toFixed(2);
    if(currentTime <= 9.99) {
        timerEl.textContent = `0${currentTime}s`
    } else {
        timerEl.textContent = `${currentTime}s`
    }
}

function gameCompleted() {
    clearInterval(gameTimerInterval);
    timerResult.textContent = `${currentTime}s`;
    gameContain.classList.add(`disabled`);
    endContain.classList.remove(`disabled`);
    shareLink.href = `https://twitter.com/intent/tweet?text=Can+you+beat+${currentTime}s%3F+Try+here%3A+https%3A%2F%2Fjamiem89.github.io+%23typeattack`
}

function gameRestart() {
    endContain.classList.add(`disabled`);
    introContain.classList.remove(`disabled`);
}

document.addEventListener('keyup', typeCheck);
startGame.addEventListener('click', initGame);
restartGame.addEventListener('click', gameRestart);