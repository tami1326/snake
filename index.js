const grid = document.querySelector('.gameBoard');
const score = document.querySelector('.scoreBoard');
const message = document.getElementById('finalMessage')
const gridSize = 20;
let appleCurrentIndex = 0;
let keyName = [];
let headColor = 0;
let headcurrentIndex = 147;
let snakeCurrentIndex = [147, 146, 145];
let direction = 1;
let currentScore = 0;
let checkGameRunning = 0;

createBoard();

function createBoard() {
    for (let i = 0; i < gridSize * gridSize; ++i) {
        let square = document.createElement('div');
        square.setAttribute('id', i);
        grid.appendChild(square);
    }
    for (let i = 146; i >= 145; --i) {
        let change = document.getElementById(i);
        change.style.background = "rgb(218, 211, 224)";
    }
    changeHeadColor();
    addFood();
    document.addEventListener('keydown', (event) => {
        keyName = event.key;
    });
    setInterval(function() {
        checkKey(keyName);
    }, 100);
}

function checkKey(keyName) {
    if (checkGameRunning == 0) {
        if (keyName == 'ArrowUp') {
            direction = -gridSize;
            checkDirection(direction);
        } else if (keyName == 'ArrowDown') {
            direction = +gridSize;
            checkDirection(direction);
        } else if (keyName == 'ArrowRight') {
            direction = 1;
            checkDirection(direction);
        } else if (keyName == 'ArrowLeft') {
            direction = -1;
            checkDirection(direction);
        }
    }
}

function checkDirection(direction) {
    let futurePosition = snakeCurrentIndex[0] + direction;
    if ((snakeCurrentIndex[0] + gridSize >= (gridSize * gridSize) && direction == gridSize) ||
    (snakeCurrentIndex[0] % gridSize == gridSize - 1 && direction == 1) ||
    (snakeCurrentIndex[0] % gridSize == 0 && direction == -1) ||
    (snakeCurrentIndex[0] - gridSize < 0 && direction == -gridSize) ||
    snakeCurrentIndex.includes(futurePosition)) {
        checkGameRunning = 1;
        displayMessage();
        return;
    } 
    snakeCurrentIndex.unshift(futurePosition);
    changeHeadColor();
    addTail();
    let removeTail = document.getElementById(snakeCurrentIndex[snakeCurrentIndex.length - 1]);
    removeTail.style.background = "rgb(138, 117, 168)";
    snakeCurrentIndex.pop();
    if (snakeCurrentIndex[0] == appleCurrentIndex) {
        snakeCurrentIndex.push(appleCurrentIndex);
        addTail();
        ++currentScore
        updateScore(currentScore);
        addFood();
    }
}

function changeHeadColor() {
    headColor = document.getElementById(snakeCurrentIndex[0]);
    headColor.style.background = "rgb(94, 31, 94)"
}

function addFood() {
    appleCurrentIndex = Math.floor(Math.random() * (gridSize * gridSize - 1));
    let currentSquare = document.getElementById(appleCurrentIndex);
    while (currentSquare.style.background == "rgb(218, 211, 224)") {
        appleCurrentIndex = Math.floor(Math.random() * (gridSize * gridSize - 1));
        currentSquare = document.getElementById(appleCurrentIndex);
    }
    currentSquare.style.background = "rgb(211, 0, 249)";
}

function addTail() {
    for (let i = 1; i < snakeCurrentIndex.length - 1; ++i) {
        let addTail = document.getElementById(snakeCurrentIndex[i]);
        addTail.style.background = "rgb(218, 211, 224)";
    }
} 

function updateScore(currentScore) {
    score.innerText = 'Score: ' + currentScore;
}

function displayMessage() {
    message.innerText = "You lost!"
}

function restartGame() {
    window.location.reload();
}
