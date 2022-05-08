/*
Load.js by Emily, Margaret, and Joe
 */


/*
Add the function windowLoad() to the Event Listener HTML DOM
 */
window.addEventListener( "load", function() {
    windowLoad();
} );

/*
Create the GUI the user sees upon loading the HTML. The 26 alphabetical buttons are loaded
 */
function windowLoad(){
    var p, letter, button, holder;
    holder = document.getElementById( "buttons" );
    for ( var i = 65; i <= 90; i++ ) {
        if ( i === 65 || i === 75 || i === 84 ) {
            p = document.createElement( "p" );
        }
        letter = String.fromCharCode( i );
        button = document.createElement( "button" );
        button.innerHTML = letter;
        button.setAttribute( "data-letter", letter );
        button.onclick = function() { setLetter( this.getAttribute( "data-letter" ) ); };
        p.appendChild( button );
        if ( i === 74 || i === 83 || i === 90 ) {
            holder.appendChild( p );
        }
    }
}

/*
A helper function to windowLoad(). This sets the innerHTML of each alphabetical button to be the proper letter
 */
function setLetter( letter ) {
    var div = document.getElementById( "buttonName" );
    div.innerHTML = div.innerHTML + letter;
}
