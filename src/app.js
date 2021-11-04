require('dotenv').config();
const process   = require( 'process' );
const path      = require( 'path' );
const fs        = require( 'fs' );
const Template = require('./model/Template.js');
const Character = require('./model/Character.js');
const sheet     = fs.readFileSync( path.resolve('public/char.html'), 'utf8' );

class App {
    constructor ( ) {
        this.express    = require( 'express' );
        const app       = this.express();

        app.use( require( 'body-parser' ).json()    );
        app.use( this.express.static(path.resolve('public')) );

        this.app = app;
        this.init_routes( );
        return this;
    }

    init_routes ( ) {
        this.app.get( '/', ( request, response ) => {
            response.redirect( '/create' );
        } );

        this.app.get( '/ping', ( request, response ) => {
            response.status(200).json( { connection: true } );
        } );

        this.app.get( '/sheet', ( request, response ) => {
            const charId = request.query.id;
            if ( !charId ) {
                response.status(400).json( new Error('Missing character id') );
                return;
            }
            Character.get( charId ).then( ( character ) => {
                Template.get( character.template ).then( ( template ) => {
                    response.send( sheet.replace( '<!-- Ficha -->', template.ui ) );
                    //response.send( sheet.replace( '<!-- Ficha -->', fs.readFileSync( path.resolve('public/template1.html') ) ) );
                } )
                .catch( ( error ) => {
                    console.error( error );
                    response.status(500).json( new Error("Failed to get Template: " + error) );
                } );
            } )
            .catch( error => {
                console.error( error );
                response.status(500).json( new Error("Failed to get Character: " + error) );
            } )
        } );

        this.app.get( "/create", ( resquest, response ) => {
            response.sendFile( path.resolve('public/create.html') );
        } )

        this.app.use( require( './routes/template.js' ) );
        this.app.use( require( './routes/character.js' ) );
    }
}

module.exports = new App();