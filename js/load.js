document.onload = function loadButtons() {
    let html = '';
    let letter;

    for(let i = 65; i <= 90; i++){
        letter = String.fromCharCode(i);
        html += '<button onclick="setLetter(\'' + letter + '\');">' + letter + '</button>';
    }

    document.getElementById("buttons").innerHTML = html;
};

var setLetter = function(letter){
    document.getElementById("buttonName").innerHTML = letter;
}