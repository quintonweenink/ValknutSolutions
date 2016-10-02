"use strict"

var jwt = require('jsonwebtoken')

var auth = require('../../config/auth')

const config = require('../../config/auth')

module.exports = {
<<<<<<< 2da2d4c299e655eda25c5380136ea90c621ef1f5
	isName : function(res){
		return false
	},
	isPhoneNumber : function(res){
		return false
    },
    isEmail : function(res){
		return false
    }
=======

    validate : function(user){
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
    }

>>>>>>> new file to git ignore
}
