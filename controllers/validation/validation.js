"use strict"

var jwt = require('jsonwebtoken')

var auth = require('../../config/auth')

const config = require('../../config/auth')

var validator = require('validator')

module.exports = {
	isName : function(res){
		if(!validator.isEmpty(res))
			if(validator.isAlpha(res))
				return true
		return false
	},
	isPhoneNumber : function(res){
		if(!validator.isEmpty(res))
			if(validator.isMobilePhone(res, 'en-ZA'))
				return true
		return false
    },
	isMarital : function(res){
		if(res == 'single' || res == 'married')
				return true
		return false
    },
	isDate : function(res){
		if(!validator.isEmpty(res))
			if(validator.isDate(res))
				return true
		return false
	},
	isGender : function(res){
		if(res == 'male' || res == 'female')
				return true
		return false
	},
    isEmail : function(res){
		if(!validator.isEmpty(res))
			if(validator.isEmail(res))
				return true
		return false
    }
}
