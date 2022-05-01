let numberOfGuesses = 6; // number of incorrect guesses left
let possibleWords;
possibleWords = ["cat, dog, fish"];
let socket;
let guessInProgress = "";
let missedLetters = [];
let correctLetters = [];
let allLetters = [];
let currentWord;
let imageSources = ["pics/hangmandesigns.jpg", "pics/hangman0Lives.jpg", "pics/hangman1Lives.jpg",
    "pics/hangman2Lives.jpg", "pics/hangman3Lives.jpg", "pics/hangman4Lives.jpg", "pics/hangman4Lives.jpg",
"pics/hangman6Lives.jpg"]
let picture = document.getElementById("pics");

document.getElementById("startGame").addEventListener("click", startGame);
document.getElementById("buttons").addEventListener("click", getLetter);

function startGame(){
    document.getElementById("startGame").innerHTML = "Game Started";

    // create websocket to connect with Python
    socket = new WebSocket('ws://localhost:13456');

    // Choose random word from list of possibilities
    currentWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];

    for (i = 0; i < currentWord.length; i++){
        if(currentWord[i] === " "){
            allLetters[i] = "/";
        }
        else {
            allLetters[i] = "_";
        }
    }
    document.getElementById("lettersLeft").innerHTML = allLetters.join(" ");
}

// After each incorrect guess, the image in the game will change
function changeImage(){
    let guessMessage = document.getElementById("numGuesses");
    switch (numberOfGuesses) {
        case 1:
            picture.src(imageSources[1]);
            guessMessage.textContent = "YOU HAVE ONE GUESS LEFT."
            break;
        case 2:
            picture.src(imageSources[2]);
            break;
        case 3:
            picture.src(imageSources[3]);
            break;
        case 4:
            picture.src(imageSources[4]);
            break;
        case 5:
            picture.src(imageSources[5]);
            break;
        case 6:
            picture.src(imageSources[6]);
            guessMessage.innerHTML = "YOU HAVE FIVE GUESSES LEFT."
            break;
        default:
            picture.src(imageSources[0]);
    }
}

// Get the letter the user chose from the letter buttons, and send to Python server
function getLetter(){
    guessInProgress = document.getElementById("buttonName").innerHTML;
    let lastChar = guessInProgress.substring(guessInProgress.length - 1);
    socket.send(lastChar);
}

function updateLettersLeft(){
    let arrWord = currentWord.split();
    for(i = 0; i < currentWord.length; i++){
        if(arrWord.indexOf(guessInProgress)){
            allLetters[i] = guessInProgress;
        }
        else{
            allLetters[i] = "_";
        }
    }
}