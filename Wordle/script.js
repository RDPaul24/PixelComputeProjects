
const gameBoard = document.querySelector("#gameBoard");
const guessInput = document.querySelector("#guessInput");
const submitButton = document.querySelector("#submitButton");
const message = document.querySelector("#message");

const fiveLetters = words.filter(function(word) {
    return word.length === 5;
});

let randNumber = Math.floor(Math.random() * fiveLetters.length);
let correctWord = fiveLetters[randNumber].toUpperCase();

let cells = [];
let currentRow = 0;
let gameOver = false;

for (let i = 0; i < 30; i++) {
    let newCell = document.createElement("div");

    newCell.classList.add("cell");
    gameBoard.appendChild(newCell);
    cells.push(newCell);
}

function checkGuess() {
    if (gameOver) {
        return;
    }

    let userGuess = guessInput.value.trim().toUpperCase();

    if (userGuess.length !== 5) {
        message.textContent = "Please enter a 5-letter word.";
        return;
    }

    if (!fiveLetters.includes(userGuess.toLowerCase())) {
        message.textContent = "Please enter a valid word.";
        return;
    }

    for (let i = 0; i < 5; i++) {
        cells[currentRow * 5 + i].textContent = userGuess[i];
    }

    let letterCount = {};

    for (let i = 0; i < 5; i++) {
        let letter = correctWord[i];

        if (letterCount[letter] === undefined) {
            letterCount[letter] = 0;
        }

        letterCount[letter]++;
    }

    for (let i = 0; i < 5; i++) {
        let currentCell = cells[currentRow * 5 + i];

        if (userGuess[i] === correctWord[i]) {
            currentCell.classList.add("correct");
            letterCount[userGuess[i]]--;
        }
    }

    for (let i = 0; i < 5; i++) {
        let currentCell = cells[currentRow * 5 + i];
        let letter = userGuess[i];

        if (currentCell.classList.contains("correct")) {
            continue;
        }

        if (letterCount[letter] > 0) {
            currentCell.classList.add("present");
            letterCount[letter]--;
        } else {
            currentCell.classList.add("absent");
        }
    }

    if (userGuess === correctWord) {
        message.textContent = "Congratulations! You guessed the word!";
        gameOver = true;
        guessInput.disabled = true;
        submitButton.disabled = true;
    } else {
        currentRow++;

        if (currentRow === 6) {
            message.textContent =
                'Game over, the word was "' + correctWord + '".';

            gameOver = true;
            guessInput.disabled = true;
            submitButton.disabled = true;
        } else {
            message.textContent = "Try again!";
        }
    }

    guessInput.value = "";

    if (!gameOver) {
        guessInput.focus();
    }
}

submitButton.addEventListener("click", checkGuess);

guessInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});
