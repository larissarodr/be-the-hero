const crypto = require('crypto');

module.exports = function generateUnitId(){
    return crypto.randomBytes(4).toString('HEX');
}