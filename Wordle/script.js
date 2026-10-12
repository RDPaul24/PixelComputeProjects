
const gameBoard = document.querySelector("#gameBoard");
const guessInput = document.querySelector("#guessInput");
const submitButton = document.querySelector("#submitButton");
const message = document.querySelector("#message");

// Selecting a random five-letter word from word_list.js
const fiveLetters = words.filter(function(word) {
    return word.length === 5;
});

let randNumber = Math.floor(Math.random() * fiveLetters.length);
let correctWord = fiveLetters[randNumber].toUpperCase();

let cells = [];
let currentRow = 0;
let gameOver = false;

// Creating 30 cells for 6 attempts and 5 letters
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

    // Check that the guess has five letters
    if (userGuess.length !== 5) {
        message.textContent = "Please enter a 5-letter word.";
        return;
    }

    // Check whether the word exists in the word list
    if (!fiveLetters.includes(userGuess.toLowerCase())) {
        message.textContent = "Please enter a valid word.";
        return;
    }

    // Display the guessed letters in the current row
    for (let i = 0; i < 5; i++) {
        cells[currentRow * 5 + i].textContent = userGuess[i];
    }

    // Count how many times each letter appears in the answer
    let letterCount = {};

    for (let i = 0; i < 5; i++) {
        let letter = correctWord[i];

        if (letterCount[letter] === undefined) {
            letterCount[letter] = 0;
        }

        letterCount[letter]++;
    }

    // Marking the letters which are in the correct position
    for (let i = 0; i < 5; i++) {
        let currentCell = cells[currentRow * 5 + i];

        if (userGuess[i] === correctWord[i]) {
            currentCell.classList.add("correct");
            letterCount[userGuess[i]]--;
        }
    }

    // Marking the letters that exist in the answer but are misplaced
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

    // Check whether the player has won
    if (userGuess === correctWord) {
        message.textContent = "Congratulations! You guessed the word!";
        gameOver = true;
        guessInput.disabled = true;
        submitButton.disabled = true;
    } else {
        currentRow++;

        // Check whether all six attempts have been used
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

// Run the game when the button is clicked
submitButton.addEventListener("click", checkGuess);

// Also submit the guess when Enter is pressed
guessInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});
