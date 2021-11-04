const slq = require('mysql');
const config = require('./config/config.json');

class Database {
    constructor ( 
        host = config.host, 
        user = config.username, 
        password = config.password, 
        database = config.database, 
        port = config.port
    ) {
        this.connection = slq.createPool({
            host: host,
            user: user,
            password: password,
            database: database,
            port: port
        });
    }

    /**
     * 
     * @param {String} sql 
     * @param {String[]} params 
     * @returns Promise
     */
    execute ( sql, params = []) { 
        return new Promise( ( resolve, reject ) => {
            this.connection.query(sql, params, (err, rows) => { 
                if (err) reject(err);
                else     resolve(rows);
            } );
        } );
    }
}

module.exports = new Database();