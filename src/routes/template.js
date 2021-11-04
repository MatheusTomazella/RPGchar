const express = require('express');
const Template = require('../model/Template');
const fs = require('fs');
const path = require('path');
const previewPage = fs.readFileSync(path.resolve( 'public/preview.html' ), 'utf8');

const router = express.Router();

router.get( '/template/:id', ( request, response ) => {
    Template.get( request.params.id )
    .then( response.status( 200 ).json.bind(response) )
    .catch( ( err ) => { 
        console.error( err );
        response.status( 500 ).send( err );
    } );
} );

router.get( '/template', ( request, response ) => {
    Template.get( )
    .then( response.status(200).json.bind(response) )
    .catch( ( err ) => { 
        console.error( err );
        response.status( 500 ).send( err );
    } );
} );

router.get( '/preview', ( request, response ) => {
    if ( !request.query.id ) {
        response.status( 400 ).send( new Error('Missing id') );
        return;
    }
    Template.get( request.query.id )
    .then( result => {
        response.status( 200 ).send( previewPage.replace( '<!-- Ficha -->', result.ui ) );
    } )
    .catch( ( err ) => { 
        console.error( err );
        response.status( 500 ).send( err );
    } );
} )

module.exports = router;