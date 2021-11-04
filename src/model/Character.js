const database = require('../Database');
const { generateId } = require('../util');
const Template = require('./Template');

class Character { 
    
    /**
     * @typedef {string} JSON
     * @typedef {string} HTML
     * @param {{id: string, name: string, ui: HTML, data: JSON, skills: JSON}} data
     * @returns Character
     */
    constructor ( data ) {
        Object.assign( this, data );
    }
    
    /**
     * @param {string} id 
     * @returns Promise<Character>
     */
    static get ( id ) { 
        return new Promise( ( resolve, reject ) => {
            if ( !id ) reject( new Error( 'No id provided' ) );
            database.execute( `SELECT * FROM RPG_char WHERE id = ?;`, [id] )
            .then( ( result ) => {
                if ( result.length === 0 ) reject( new Error(`Character with id ${id} does not exist`) );
                resolve( new Character( result[0] ) );
            })
            .catch( reject ); 
        } );
    }

    static create ( template ) {
        return new Promise( async ( resolve, reject ) => {
            const id = generateId();
            const data = await Template.getDefaultData( template ).catch( reject );
            database.execute( `INSERT INTO RPG_char (id, template, data, skills) VALUES (?, ?, ?, ?);`, [
                id,
                template,
                data,
                JSON.stringify( [] )
            ] )
            .then( ( result ) => {
                resolve( id );
            })
            .catch( error => {
                console.error( error );
                reject( error );
            } );
        } );
    }

    save ( ) { 
        return new Promise( ( resolve, reject ) => {
            database.execute( `UPDATE RPG_char SET data = ?, skills = ? WHERE id = ?;`, [
                JSON.stringify( this.data ),
                JSON.stringify( this.skills ),
                this.id
            ] )
            .then( resolve )
            .catch( reject );
        } );
    }
}

module.exports = Character;