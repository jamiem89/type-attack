// Grab elements
const currentWord = document.querySelector(`#currentWord`);
const skip = document.querySelector('#nextLevel');
let currentLevel = 1;
let currentStage = 0;
let currentChar = 0;
let word = [];

// Words to spell
const wordsLevelOne = [
    `hello`,
    `welcome`,
    `hope`,
    `you`,
    `have`,
    `fun`
];

function setLevel(){
    currentWord.textContent = '';
    currentStage ++;
    let word = wordsLevelOne[currentStage].split("");

    word.forEach(function(letter) {
        let char = document.createElement(`span`);
        char.textContent = letter;
        currentWord.appendChild(char);
    });

    console.log(`Level has been set`);
    console.log(`Current stage: ${currentStage}`);
}

function typeCheck(e) {
    let chars = document.querySelector(`#currentWord`).innerText;
    let spans = document.querySelectorAll(`#currentWord span`);
    chars = chars.split("");

    if(e.key == chars[currentChar]) {
        currentChar ++;
        spans.item(currentChar - 1).classList.add(`correct`);
        console.log(`Character correct`);
    } else {
        gameReset();
        alert(`you suck`);
    }

    if(currentChar >= chars.length) {
        console.log(`Word correct`);
        if(currentStage > word.length) {
            currentLevel ++;
            // console.log(`Current level:${currentLevel}`);

        }
        currentChar = 0;
        setLevel();
    }

    // console.log(`Chars: ${chars}`);
    // console.log(`Current span: ${currentChar}`);
    // console.log(`Current character: ${chars[currentChar]}`);
    // console.log(`Current level: ${currentStage}`);
}

function gameReset() {
    currentLevel = 1;
    currentStage = 0;
    currentChar = 0;
    word = [];
    setLevel();
}

gameReset();
document.addEventListener('keyup', typeCheck);
skip.addEventListener('click', setLevel);





