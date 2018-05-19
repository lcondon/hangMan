var characters = [
    "ron swanson",
    "leslie knope",
    "andy dwyer",
    "april ludgate",
    "tom haverford",
    "ann perkins",
    "jerry gergich",
    "donna meagle",
    "ben wyatt",
    "chris traeger"
];

var allowedGuesses;
var correctGuesses = [];
var wrongGuesses = [];
var winsTotal = 0;
var chosenWord;

var wordElement = document.getElementById("wordHolder");
var guessesRemaining = document.getElementById("guessCount");
var letterGuess = document.getElementById("lettersGuessed");
var winsUpdated = document.getElementById("winCount");
var winPic = document.getElementById("winMessage");

var acceptableGuesses = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

function startNewGame() {
    chosenWord = characters[Math.floor(Math.random() * characters.length)];
    console.log(chosenWord);
    allowedGuesses = 13;
    correctGuesses = [];
    letterGuesses = [];
    setTimeout(hideMessage, 2000);

    for (var i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i] === " ") {
            correctGuesses[i] = "+";
        } else {
            correctGuesses[i] = "_";
        }
    }
    wordElement.innerHTML = correctGuesses.join(" ");
    guessesRemaining.innerHTML = allowedGuesses;
};

function updateGuesses(letter) {

    if (chosenWord.indexOf(letter) === -1 && acceptableGuesses.indexOf(letter) >= 0) {
        if (wrongGuesses.indexOf(letter) >= 0) {

        } else {
            wrongGuesses.push(letter);
            letterGuess.innerHTML = wrongGuesses.join(", ");
            console.log(chosenWord.indexOf(letter));
            console.log(wrongGuesses);
            allowedGuesses--;
            guessesRemaining.innerHTML = allowedGuesses;
        }
    } else if (chosenWord.indexOf(letter) >= 0 && acceptableGuesses.indexOf(letter) >= 0) {
        for (var i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] === letter) {
                correctGuesses[i] = letter;
            }
            wordElement.innerHTML = correctGuesses.join(" ");
        }
        allowedGuesses--;
        guessesRemaining.innerHTML = allowedGuesses;
    }
};

function updateWins() {
    winsTotal++;
    winsUpdated.innerHTML = winsTotal;
};

function showMessage() {
    winPic.style.visibility = "visible";
}

function hideMessage() {
    winPic.style.visibility = "hidden";
}

function didYouWin() {
    if (correctGuesses.indexOf("_") === -1) {
        updateWins();
        setTimeout(showMessage, 1000);
        setTimeout(startNewGame, 1000);
    } else if (allowedGuesses === 0) {
        alert("You lost.")
        startNewGame();
    }
};

window.onload = startNewGame();

document.onkeyup = function (event) {
    var letterPressed = event.key.toLowerCase();
    updateGuesses(letterPressed);
    didYouWin();
};



