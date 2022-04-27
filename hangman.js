var numberOfGuesses = 6;
var wonGame = False;
var possibleWords = ["cat", "dog", "fish"];
var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
'k', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var guessInProgress = "";
var missedLetters = [];
var correctLetters = [];


function randomWord(possibleWords){
    const currentWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
};

//function buttons(letters){
//    letterButton = document.createElement("letterButton");
//    for(var i = 0; i < letters.length; i++){
//        letter = document.getElementById("buttons");
//        letter.innerText = letters;
//        letter.appendChild(letterButton);
//    }
//};
