const database = require('../Database');

class Template { 
    
    /**
     * @typedef {string} JSON
     * @typedef {string} HTML
     * @param {{id: string, name: string, ui: HTML, data: JSON, skills: JSON}} data
     * @returns Template
     */
    constructor ( data ) {
        Object.assign( this, data );
    }
    
    /**
     * @param {string} id 
     * @returns Promise<Template>
     * 
     * @param {null} id
     * @returns Promise<Template>[]
     */
    static get ( id ) { 
        return new Promise( ( resolve, reject ) => {
            let sql = `SELECT * FROM RPG_template WHERE id = ?;`;
            if ( !id ) sql = `SELECT * FROM RPG_template;`;
            database.execute( sql, [id] )
            .then( ( result ) => {
                if ( result.length === 0 ) reject( ( !id ) ? "No templates found" : `Template with id ${id} does not exist` );
                if ( id ) resolve( new Template( result[0] ) );
                resolve( result.map( data => ( new Template(data) ) ) );
            })
            .catch( reject ); 
        } );
    }

    static getDefaultData ( id ) {
        return Template.get( id )
        .then( ( template ) => {
            return template.data;
        } )
    }

    save () { 
        return new Promise( ( resolve, reject ) => {
            database.execute( `UPDATE RPG_template SET name = ?, ui = ?, data = ?, skills = ? WHERE id = ?;`, [
                this.name,
                this.ui,
                JSON.stringify( this.data ),
                JSON.stringify( this.skills ),
                this.id
            ] )
            .then( resolve )
            .catch( reject );
        } );
    }
}

module.exports = Template;