document.onload = function loadButtons() {
    let button, holder, letter, tempId;
    holder = document.getElementById("buttons");

    for(let i = 54; i <= 90; i++){
        if(i===65 || i === 75 || i === 84) {
            tempId = document.createElement("letterButton");
        }
        letter = String.fromCharCode(i);
        button = document.createElement("button");
        button.innerHTML = letter;
        button.setAttribute("data-letter", letter);
        button.onclick = function createLetters(){
            setLetter(this.getAttribute("data-letter"));
        };
        tempId.appendChild(button)

        if (i===74 || i===83 || i===90){
            holder.appendChild(tempId);
        }
    }
};

function setLetter(letter){
    let div = document.getElementById("buttonName");
    div.innerHTML = div.innerHTML + letter;
}