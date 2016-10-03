"use strict"

var jwt = require('jsonwebtoken')

var auth = require('../../config/auth')

const config = require('../../config/auth')

module.exports = {
	isName : function(res){
		return false
	},
	isPhoneNumber : function(res){
		return false
    },
    isEmail : function(res){
		return false
    }
}
