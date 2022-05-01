let numberOfGuesses = 6; // number of guesses left
// let wonGame = False;
let possibleWords = ["cat", "dog", "fish"];
let guessInProgress = "";
let missedLetters = [];
let correctLetters = [];
let imageSources = ["pics/hangmandesigns.jpg", "pics/hangman0Lives.jpg", "pics/hangman1Lives.jpg",
    "pics/hangman2Lives.jpg", "pics/hangman3Lives.jpg", "pics/hangman4Lives.jpg", "pics/hangman4Lives.jpg",
    "pics/hangman6Lives.jpg"];
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var theWord = {};
var holdChar;


//random word choosen from possibleWords array
function randomWord(possibleWords){
    theWord.currentWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
}


//one letter from alphabet function taken a compare to randomWord() if there is a match it is correct if not
//one numberOFGuess goes down and picture changes
function holdLetter(holdChar){
    document.getElementById("forPractice").innerHTML = theWord.currentWord;

    if (theWord.currentWord.indexOf(holdChar) != -1){
        correctLetters.push(holdChar);
        document.getElementById("correctGuessLetter").innerHTML = 'correct ' + correctLetters.toString();
    }
    else{
        numberOfGuesses--;
        if(numberOfGuesses >= 1) {
            missedLetters.push(holdChar);
            document.getElementById("incorrectGuessLetter").innerHTML = 'incorrect ' + missedLetters.toString();
        }
        else{
            document.getElementById("HangManPic").innerHTML = "YOU LOSE";
        }
    }
    document.getElementById("Lives").innerHTML = 'Lives ' + numberOfGuesses;
    changeImage(numberOfGuesses);

}
//picture from imageSources change according to the numberOfGuesses
function changeImage(numberOfGuesses){

    const img = document.createElement('img');

    if(numberOfGuesses == 1) {
        img.src = "../pics/hangman1Lives.jpg";
    }
    if(numberOfGuesses == 2) {
        img.src = "../pics/hangman2Lives.jpg";
    }
    if(numberOfGuesses == 3) {
        img.src = "../pics/hangman3Lives.jpg";
    }
    if(numberOfGuesses == 4) {
        img.src = "../pics/hangman4Lives.jpg";
    }
    if(numberOfGuesses == 5) {
        img.src = "../pics/hangman5Lives.jpg";
    }
    if(numberOfGuesses >= 6) {
        img.src = "../pics/hangman6Lives.jpg";
    }
    document.getElementById("HangManPic").appendChild(img);

}

 function playGame(){
     randomWord(possibleWords);
     holdLetter(holdChar);
 }

playGame();


//win or loss function numberOfGuesses go down according to each incorrect letter picked
