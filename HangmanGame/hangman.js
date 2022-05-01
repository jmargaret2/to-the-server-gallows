let numberOfGuesses = 6; // number of guesses left
// let wonGame = False;
let possibleWords = ["cat", "dog", "fish"];
let missedLetters = [];
let correctLetters = [];
let imageSources = ["pics/hangmandesigns.jpg", "pics/hangman0Lives.jpg", "pics/hangman1Lives.jpg",
    "pics/hangman2Lives.jpg", "pics/hangman3Lives.jpg", "pics/hangman4Lives.jpg", "pics/hangman4Lives.jpg",
    "pics/hangman6Lives.jpg"];
var theWord = {};
var holdChar;


//random word choosen from possibleWords array
function randomWord(possibleWords){
    theWord.currentWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
}


//one letter from alphabet function taken a compare to randomWord() if there is a match it is correct if not
//one numberOFGuess goes down and picture changes
function holdLetter(holdChar){
    document.getElementById("HangManPic").innerHTML = theWord.currentWord; //for testing you can see the word
    changeImage();

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

}
//picture from imageSources change according to the numberOfGuesses
function changeImage(){
    var picture = document.createElement("picture");

    switch (numberOfGuesses) {
        case 1:
            picture.src = "pics/hangmandesigns.jpg";
            break;
        case 2:
            picture.src = "pics/hangman5Lives.jpg";
            break;
        case 3:
            picture.src = "pics/hangman4Lives.jpg";
            break;
        case 4:
            picture.src = "pics/hangman3Lives.jpg";
            break;
        case 5:
            picture.src = "pics/hangman1Lives.jpg";
            break;
        case 6:
            picture.src = "pics/hangman0Lives.jpg";
            break;
        default:
            picture.src = imageSources[0];
    var div = document.getElementById("HangManPic");
    div.appendChild(picture);
    }
}

 function playGame(){
     randomWord(possibleWords);
     holdLetter(holdChar);
 }

playGame();


//win or loss function numberOfGuesses go down according to each incorrect letter picked
