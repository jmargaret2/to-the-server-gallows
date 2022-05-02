var numberOfGuesses = 6; // number of incorrect guesses left
var socket;
var guessInProgress = "";
var guessIndex = 0;
var letterStatus = 0;
var allLetters = [];
var guessedLetters = [];
var possibleWords = ["cat", "dog", "fish", "lion", "camel", "dolphin",
                    "whale", "wolf", "bird", "leopard", "rhino"];
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
    console.log("letterIndex from server.py: " + event.data);
    // the guessed letter is not in word
    if (event.data === "-1"){
        numberOfGuesses -= 1;
        // Get the index number of the letter in the word, if -1 then the letter exists
        letterStatus = -1;
        changeImage();
    }
    // the guessed letter is in the word
    else{
        guessIndex = event.data;
        console.log("guessIndex: " + guessIndex);
        // Get the index number of the letter in the word, if -1 then the letter doesn't exist
        letterStatus = 0;
        console.log("letter is in word, and letter status is: " + letterStatus);
        updateLettersLeft();
    }
    // there are no more guesses
    if(event.data === "no more guesses"){
        numberOfGuesses = 0;
    }
    // server says game is won
    if(event.data === "win"){
        socket.close(1000, "You won the game.");
        document.getElementById("numGuesses").innerHTML = "YOU WON THE GAME.";
    }
    console.log("letter status: " + letterStatus);
};

function startGame(){
    document.getElementById("startGame").innerHTML = "Game Started";
    console.log("Game started");

    // print dashes to represent each word
    for (let i = 0; i < currentWord.length; i++){
        allLetters[i] = "_";
    }
    document.getElementById("lettersLeft").innerHTML = allLetters.join(" ");
}

// Get the letter the user chose from the letter buttons, and send to Python server
function getLetter(){
    guessInProgress = document.getElementById("buttonName").innerHTML;
    guessedLetters.push(guessInProgress.substring(guessInProgress.length - 1));
    console.log("guessed letters are: " + guessedLetters);
    let lastChar = guessInProgress.substring(guessInProgress.length - 1);
    socket.send(lastChar);
}

function updateLettersLeft(){
    console.log("made it to updateLettersLeft()");
    // letterStatus = -1 --> letter is not in word
    let guess = document.getElementById("buttonName").innerHTML;
    console.log("allLetters: " + allLetters);
    console.log("end of updateLettersLeft()");
    guess = guess.substring(guess.length - 1);
    console.log("guess now: " + guess);
    allLetters[guessIndex] = guess;
    document.getElementById("lettersLeft").innerHTML = allLetters;
}

// After each incorrect guess, the image in the game will change
function changeImage(){
    let guessMessage = document.getElementById("numGuesses");
    console.log("picture src: " + document.getElementById("pics").toString());
    console.log("Number of guesses in changeImage(): " + numberOfGuesses);
    switch (numberOfGuesses) {
        case 0:
            document.getElementById("pics").src = "pics/hangman0Lives.jpg";
            guessMessage.innerHTML = "YOU HAVE NO GUESSES LEFT. YOU HAVE LOST THE GAME.";
            socket.close(1000, "YOU LOST THE GAME");
            break;
        case 1:
            document.getElementById("pics").src = "pics/hangman1Lives.jpg";
            guessMessage.innerHTML = "YOU HAVE ONE INCORRECT GUESSES LEFT.";
            break;
        case 2:
            document.getElementById("pics").src = "pics/hangman2Lives.jpg";
            guessMessage.innerHTML = "YOU HAVE TWO INCORRECT GUESSES LEFT.";
            break;
        case 3:
            document.getElementById("pics").src = "pics/hangman3Lives.jpg";
            guessMessage.innerHTML = "YOU HAVE THREE INCORRECT GUESSES LEFT.";
            break;
        case 4:
            document.getElementById("pics").src = "pics/hangman4Lives.jpg";
            guessMessage.innerHTML = "YOU HAVE FOUR INCORRECT GUESSES LEFT.";
            break;
        case 5:
            document.getElementById("pics").src = "pics/hangman6Lives.jpg";
            guessMessage.innerHTML = "YOU HAVE FIVE INCORRECT GUESSES LEFT.";
            break;
        default:
            guessMessage.innerHTML = "YOU HAVE SIX INCORRECT GUESSES LEFT.";
    }
}

function playAgain(){
    // create websocket to connect with Python
    socket = new WebSocket('ws://localhost:8080');
    socket.onopen = function() {
        socket.send(currentWord);
    };
    currentWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
    allLetters = [];
    startGame();
    document.getElementById("pics").src = "pics/hangmandesigns.jpg";
    document.getElementById("numGuesses").innerHTML = "YOU HAVE SIX INCORRECT GUESSES LEFT";
    document.getElementById("buttonName").innerHTML = "";
}