const express = require('express');
const Character = require('../model/Character');

const router = express.Router();

router.get( '/char/:id', ( request, response ) => {
    Character.get( request.params.id )
    .then( response.status( 200 ).json.bind(response) )
    .catch( ( err ) => { 
        console.error( err );
        response.status( 500 ).send( err );
    } );
} );

router.get( '/char', ( request, response ) => {
    response.status(501).send('Not Implemented');
} );

router.post( '/char', ( request, response ) => { 
    Character.create( request.body.template )
    .then( id => {
        response.status( 201 ).json( { id } );
    } )
    .catch( error => { response.status( 500 ).json( error ); } );
} );

router.put ( '/char/:id', ( request, response ) => { 
    new Character( request.body ).save()
    .then( result => {
        response.status( 200 ).json( result );
    } )
    .catch( response.status( 500 ).send.bind(response) );
} );

module.exports = router;