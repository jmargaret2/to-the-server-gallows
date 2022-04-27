window.addEventListener( "load", function() {
    windowLoad();
} );

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

function setLetter( letter ) {
    var div = document.getElementById( "buttonName" );
    div.innerHTML = div.innerHTML + letter;
}
