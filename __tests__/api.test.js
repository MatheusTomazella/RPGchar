const request = require( 'supertest' );
const app = require( '../src/app' );

describe ( 'API requests', ( ) => {
    it('Should return a success response for the ping url', async () => {
        const response = await request( app.app ).get( '/ping' )
        expect( response.status ).toBe( 200 );
        expect( response.body ).toEqual( { connection: true } );
    });

    it('Should', async () => {
        
    });
} )