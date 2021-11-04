const log = document.getElementById( 'log-content' );

function addToLog ( string ) {
    log.innerHTML += string + '<br><br>';
    log.scrollTo( 0, log.scrollHeight );
}