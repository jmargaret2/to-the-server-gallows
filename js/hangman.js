let numberOfGuesses = 6; // number of incorrect guesses left
let socket;
let guessInProgress = "";
let letterStatus;
let allLetters = [];
let possibleWords;
possibleWords = ["cat", "dog", "fish"];
var currentWord;
let imageSources = ["pics/hangmandesigns.jpg", "pics/hangman0Lives.jpg", "pics/hangman1Lives.jpg",
    "pics/hangman2Lives.jpg", "pics/hangman3Lives.jpg", "pics/hangman4Lives.jpg", "pics/hangman4Lives.jpg",
"pics/hangman6Lives.jpg"]
let picture = document.getElementById("pics");

document.getElementById("startGame").addEventListener("click", startGame);
document.getElementById("buttons").addEventListener("click", getLetter);

socket.addEventListener('message', function (event) {
    if(event.data.toString() === "word"){
        letterStatus = true;
    }
    if(event.data.toString() === "no word"){
        letterStatus = false;
        numberOfGuesses -= 1;
    }
    if(event.data.toString() === "no guesses"){
        numberOfGuesses = 0;
    }
});

function startGame(){
    document.getElementById("startGame").innerHTML = "Game Started";

    // create websocket to connect with Python
    socket = new WebSocket('ws://localhost:13456');

    // choose a word at random
    currentWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];

    // print dashes to represent each word
    for (i = 0; i < currentWord.length; i++){
        allLetters[i] = "_";
    }
    document.getElementById("lettersLeft").innerHTML = allLetters.join(" ");

    socket.onopen = function() {
        socket.send(currentWord);
    };
}

// Get the letter the user chose from the letter buttons, and send to Python server
function getLetter(){
    guessInProgress = document.getElementById("buttonName").innerHTML;
    let lastChar = guessInProgress.substring(guessInProgress.length - 1);
    socket.send(lastChar);
    updateLettersLeft();
}

function updateLettersLeft(){
    if(letterStatus === true){
        for(i = 0; i < currentWord.length; i++){
            if(currentWord[i] === guessInProgress){
                allLetters[i] = guessInProgress;
            }
        }
    }
    changeImage();
}

// After each incorrect guess, the image in the game will change
function changeImage(){
    let guessMessage = document.getElementById("numGuesses");
    switch (numberOfGuesses) {
        case 1:
            picture.src(imageSources[1]);
            guessMessage.textContent = "YOU HAVE NO GUESSES LEFT.";
            break;
        case 2:
            picture.src(imageSources[2]);
            guessMessage.innerHTML = "YOU HAVE ONE INCORRECT GUESSES LEFT.";
            break;
        case 3:
            picture.src(imageSources[3]);
            guessMessage.innerHTML = "YOU HAVE TWO INCORRECT GUESSES LEFT.";
            break;
        case 4:
            picture.src(imageSources[4]);
            guessMessage.innerHTML = "YOU HAVE THREE INCORRECT GUESSES LEFT.";
            break;
        case 5:
            picture.src(imageSources[5]);
            guessMessage.innerHTML = "YOU HAVE FOUR INCORRECT GUESSES LEFT.";
            break;
        case 6:
            picture.src(imageSources[6]);
            guessMessage.innerHTML = "YOU HAVE FIVE INCORRECT GUESSES LEFT.";
            break;
        default:
            guessMessage.innerHTML = "YOU HAVE SIX INCORRECT GUESSES LEFT";
            picture.src(imageSources[0]);
    }
}