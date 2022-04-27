let numberOfGuesses = 6; // number of guesses left
let wonGame = False;
let possibleWords = ["cat", "dog", "fish"];
let guessInProgress = "";
let missedLetters = [];
let correctLetters = [];
let imageSources = ["pics/hangmandesigns.jpg", "pics/hangman0Lives.jpg", "pics/hangman1Lives.jpg",
    "pics/hangman2Lives.jpg", "pics/hangman3Lives.jpg", "pics/hangman4Lives.jpg", "pics/hangman4Lives.jpg",
"pics/hangman6Lives.jpg"]
let picture = document.getElementById("pics");


function randomWord(possibleWords){
    const currentWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
}

function changeImage(imageName){
    switch (numberOfGuesses) {
        case 1:
            picture.src(imageSources[1]);
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
            break;
        default:
            picture.src(imageSources[0]);
    }
}