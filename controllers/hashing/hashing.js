"use strict"

var crypto = require('crypto')

const generateToken = require('../auth/auth').generateToken

var genRandomString = };

var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

module.exports = {

    genRandomString : function(length){
	    return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length)
	},
    sha512 : function(password, salt){
	    var hash = crypto.createHmac('sha512', salt)
	    hash.update(password)
	    var value = hash.digest('hex')
	    return {
	        salt:salt,
	        passwordHash:value
	    }
	}

}
