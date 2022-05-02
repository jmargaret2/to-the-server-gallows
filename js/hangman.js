var numberOfGuesses = 6; // number of incorrect guesses left
var socket;
var guessInProgress = "";
var letterStatus;
var allLetters = [];
var possibleWords = ["cat", "dog", "fish"];
var currentWord;

// choose a word at random
currentWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
console.log(currentWord);

// create websocket to connect with Python
socket = new WebSocket('ws://localhost:8080');
socket.onopen = function() {
    socket.send(currentWord);
};

socket.onmessage = function(event) {
    console.log(event.data);
    // the guessed letter is in the word
    if(event.data.length === 1){
        letterStatus = true;
    }
    // the guessed letter is not in word
    else if (event.data === "letter not in word"){
        letterStatus = false;
        numberOfGuesses -= 1;
        console.log("number of guesses left: " + numberOfGuesses);
    }
    // there are no more guesses
    else if(event.data.toString() === "0"){
        numberOfGuesses = 0;
    }
    console.log("letter status: " + letterStatus);
};

function startGame(){
    document.getElementById("startGame").innerHTML = "Game Started";

    // print dashes to represent each word
    for (i = 0; i < currentWord.length; i++){
        allLetters[i] = "_";
    }
    document.getElementById("lettersLeft").innerHTML = allLetters.join(" ");
}

// Get the letter the user chose from the letter buttons, and send to Python server
function getLetter(){
    guessInProgress = document.getElementById("buttonName").innerHTML;
    let lastChar = guessInProgress.substring(guessInProgress.length - 1);
    socket.send(lastChar);
}

function updateLettersLeft(){
    console.log("made it to updateLettersLeft()");
    if(letterStatus === true){
        for(let i = 0; i < currentWord.length; i++){
            if(currentWord[i] === guessInProgress){
                allLetters[i] = guessInProgress;
            }
        }
        console.log("end of updateLettersLeft()");
    }
}

// After each incorrect guess, the image in the game will change
function changeImage(){
    let guessMessage = document.getElementById("numGuesses");
    console.log("picture src: " + document.getElementById("pics").toString());
    console.log("Number of guesses in changeImage(): " + numberOfGuesses);
    switch (numberOfGuesses) {
        case 1:
            document.getElementById("pics").src = "pics/hangman0Lives.jpg";
            guessMessage.innerHTML = "YOU HAVE NO GUESSES LEFT.";
            socket.close(1001, "Server shutting down");
            break;
        case 2:
            document.getElementById("pics").src = "pics/hangman1Lives.jpg";
            guessMessage.innerHTML = "YOU HAVE ONE INCORRECT GUESSES LEFT.";
            break;
        case 3:
            document.getElementById("pics").src = "pics/hangman2Lives.jpg";
            guessMessage.innerHTML = "YOU HAVE TWO INCORRECT GUESSES LEFT.";
            break;
        case 4:
            document.getElementById("pics").src = "pics/hangman3Lives.jpg";
            guessMessage.innerHTML = "YOU HAVE THREE INCORRECT GUESSES LEFT.";
            break;
        case 5:
            document.getElementById("pics").src = "pics/hangman4Lives.jpg";
            guessMessage.innerHTML = "YOU HAVE FOUR INCORRECT GUESSES LEFT.";
            break;
        case 6:
            document.getElementById("pics").src = "pics/hangman6Lives.jpg";
            guessMessage.innerHTML = "YOU HAVE FIVE INCORRECT GUESSES LEFT.";
            break;
        default:
            guessMessage.innerHTML = "YOU HAVE SIX INCORRECT GUESSES LEFT";
    }
}