// Hangman Game through Web sockets - game by Emily, Margaret, and Joe

// initialize all variables needed for JS and HTML files to display the correct information from Python server
var numberOfGuesses = 6; // number of incorrect guesses left
var socket;
var playAgainStatus = false;
var guessInProgress = "";
var guessIndex = 0;
var letterStatus = 0;
var allLetters = [];
var guessedLetters = [];
var possibleWords = ["cat", "dog", "fish", "lion", "camel", "dolphin", "frog", "lizard", "monkey", "bison", "flamingo",
                    "whale", "wolf", "bird", "leopard", "rhino", "bear", "eagle", "owl", "crane", "lynx",
                    "lemur", "raven", "cow", "newt", "stingray", "gecko", "zebra", "donkey", "kiwi",
                    "horse", "sloth"];
var currentWord;

// choose a word at random
currentWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
console.log(currentWord);

// create websocket to connect with Python
socket = new WebSocket('ws://localhost:8080');
socket.onopen = function() {
    socket.send(currentWord);
};

// Helper function to determine if the socket is closed or open at any point in time
function socketIsOpen(socket){
    return socket.readyState === socket.OPEN;
}

// Function displays game beginning, with blank dashes for each letter in the word
function startGame(){
    playAgainStatus = false;
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
    console.log("lastChar " + lastChar);
    socket.send(lastChar);
}

// Update the blank dashes within the GUI
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

// After each incorrect guess, the image in the game will change, depending on guesses remaining
function changeImage(){
    let guessMessage = document.getElementById("numGuesses");
    console.log("picture src: " + document.getElementById("pics").toString());
    console.log("Number of guesses in changeImage(): " + numberOfGuesses);
    switch (numberOfGuesses) {
        case 0:
            document.getElementById("pics").src = "pics/hangman0Lives.jpg";
            guessMessage.innerHTML = "YOU HAVE NO GUESSES LEFT. YOU HAVE LOST THE GAME.";
            document.getElementById("wordResult").innerHTML = "The word was " + currentWord;
            popUpLose();
            if(playAgainStatus === false){
                socket.close(1000, "No play again");
            }
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
            document.getElementById("pics").src = "pics/hangman5Lives.jpg";
            guessMessage.innerHTML = "YOU HAVE FIVE INCORRECT GUESSES LEFT.";
            break;
        default:
            guessMessage.innerHTML = "YOU HAVE SIX INCORRECT GUESSES LEFT.";
    }
}

// Reset all variables with values from last game, allowing user to play game again without needing to restart server
function playAgain() {
    // choose a word at random
    currentWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
    console.log(currentWord);

    // if socket somehow entered closed state, log it, reopen, and send
    if (!socketIsOpen(socket)) {
        socket.close(1000, "socket is closing now");
        console.log("socket is now closed when trying to playAgain()");
        socket = null;
        console.log("socket is reconnected");
        socket = new WebSocket('ws://localhost:8080');
        console.log("socket is reconnected");
        socket.onopen = function () {
            socket.send("rp");
            socket.send(currentWord);
        };
    } else {
        // Send Python server the new currentWord
        socket.send(currentWord);
    }

    console.log("playAgain() currentWord: " + currentWord);
    document.getElementById("pics").src = "pics/hangman6Lives.jpg";
    document.getElementById("numGuesses").innerHTML = "YOU HAVE SIX INCORRECT GUESSES LEFT";
    document.getElementById("buttonName").innerHTML = "";
    allLetters.length = 0;
    console.log("playAgain() allLetters: " + allLetters);
    guessedLetters.length = 0;
    guessIndex = "";
    guessInProgress = "";
    numberOfGuesses = 6;
    document.getElementById("wordResult").innerHTML = "";
    playAgainStatus = true;
    letterStatus = 0;

    startGame();
}

// Function which receives all messages from Python server
socket.onmessage = function(event) {
    console.log("letterIndex from server.py: " + event.data);
    // the guessed letter is not in word, then goes to update dashes of game, and Hangman image of game
    if (event.data === "-1"){
        numberOfGuesses -= 1;
        // Get the index number of the letter in the word, if -1 then the letter exists
        letterStatus = -1;
        updateLettersLeft();
        changeImage();
    }
    // the guessed letter is in the word, update dashes of game
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
    // server says game is won, and a pop up appears
    if(event.data === "win"){
        socket.close(1000, "You won the game.");
        document.getElementById("numGuesses").innerHTML = "YOU WON THE GAME.";
        popUpWin();
    }
    console.log("letter status: " + letterStatus);
};

//pop up that appears when the player loss disappears when user clicks outside the popup
function popUpLose(){
    var modal = document.getElementById("lose");

    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

//pop up that appears when the player win disappears when user clicks outside the popup
function popUpWin(){
    var modal = document.getElementById("win");

    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}