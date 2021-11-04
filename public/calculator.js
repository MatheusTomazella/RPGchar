const display = document.querySelector( '#calc-display' );

function addToDisplay ( char ) {
    display.value += char;
}

function setDisplay ( value ) { 
    clearDisplay();
    display.value = value;
}

$( '.calc-btn' ).toArray().forEach( btn => {
    if ( btn.onclick ) return;
    btn.addEventListener( 'click', e => { 
        addToDisplay( e.target.innerText );
    } );
} )

function clearDisplay () {
    display.value = '';
}

function backspace () {
    display.value = display.value.slice( 0, -1 );
}

function calculate () {
    const roll = dice.roll( replaceStats( display.value ) );
    addToLog( roll );
    setDisplay( roll.total );
}