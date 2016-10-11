"use strict"

var jwt = require('jsonwebtoken')

var auth = require('../../config/auth')

const config = require('../../config/auth')

var validator = require('validator')

module.exports = {
	isName : function(res){
		var list = res.split(' ')
		var pass = false
		for(var x = 0; x < list.length; x++)
		if(!validator.isEmpty(list[x]) && list[x] != 'undefined')
			if(validator.isAlpha(list[x])){}
			else return false
		else return false

		return true
	},
	isPhoneNumber : function(res){
		res = res.replace(/\s/g, '')
		if(!validator.isEmpty(res) && res != 'undefined')
			if(validator.isMobilePhone(res, 'en-ZA'))
				return true
		return false
    },
	isMarital : function(res){
		if(!validator.isEmpty(res) && res != 'undefined')
			if(res == 'single' || res == 'married')
					return true
		return false
	},
	isDate : function(res){
		if(!validator.isEmpty(res) && res != 'undefined')
			if(validator.isDate(res))
				return true
		return false
	},
	isGender : function(res){
		if(!validator.isEmpty(res) && res != 'undefined')
			if(res == 'male' || res == 'female')
				return true
		return false
	},
	isEmail : function(res){
		if(!validator.isEmpty(res) && res != 'undefined')
			if(validator.isEmail(res))
				return true
		return false
	}
}
