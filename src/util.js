const crypto = require('crypto');

module.exports = {
    generateId: ( identifier = "" ) => {
        return identifier + crypto.createHash('md5').update(Date.now().toString()).digest('hex')
    }
}