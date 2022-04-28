let numberOfGuesses = 6; // number of incorrect guesses left
let wonGame = False;
let possibleWords = ["cat, dog, fish"];
let guessInProgress = "";
let missedLetters = [];
let correctLetters = [];
let allLetters = [];
let currentWord;
let imageSources = ["pics/hangmandesigns.jpg", "pics/hangman0Lives.jpg", "pics/hangman1Lives.jpg",
    "pics/hangman2Lives.jpg", "pics/hangman3Lives.jpg", "pics/hangman4Lives.jpg", "pics/hangman4Lives.jpg",
"pics/hangman6Lives.jpg"]
let picture = document.getElementById("pics");

document.getElementById("buttons").addEventListener("click",
    findLetterInWord && updateLettersLeft);

document.getElementById("startGame").addEventListener("click", startGame);

function startGame(){
    document.getElementById("startGame").innerHTML = "Game Started";
    currentWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
    allLetters.length = currentWord.length;
    for (i = 0; i < allLetters.length; i++){
        allLetters.push('_');
    }
    document.getElementById("lettersLeft").innerHTML = toString(allLetters);
}

// Choose a random word from the list of possible words
function randomWord(possibleWords){
    currentWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
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

function findLetterInWord(){
    randomWord();
    guessInProgress = document.getElementById("guessedLetter").innerHTML;
    let letterIndex = currentWord.search(guessInProgress);

    // If index = -1, no match for letter is found
    // Otherwise, letter is in word
    if(letterIndex !== -1){
        correctLetters.push(guessInProgress);
        document.getElementById("correctLetter").innerHTML = correctLetters;
    }
    else{
        numberOfGuesses -= 1;
        missedLetters.push(guessInProgress);
        document.getElementById("incorrectLetter").innerHTML = missedLetters;
        changeImage();
    }
}

function updateLettersLeft(){
    let arrWord = currentWord.split();
    for(i = 0; i < currentWord.length; i++){
        if(arrWord.indexOf(guessInProgress)){
            allLetters[i].push(guessInProgress);
        }
        else{
            allLetters[i].push('_');
        }
    }
}