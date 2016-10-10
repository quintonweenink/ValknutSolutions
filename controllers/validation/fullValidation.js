"use strict"

var jwt = require('jsonwebtoken')

var auth = require('../../config/auth')

const config = require('../../config/auth')

var validator = require('./validation')

module.exports = {
	objectValidate : function(user){
		if(!validator.isName(user.first_name))
			return {success: false, message: 'Not a valid first_name'}
		if(!validator.isName(user.last_name))
			return {success: false, message: 'Not a valid last_name'}
		if(!validator.isPhoneNumber(user.phone_number))
			return {success: false, message: 'Not a valid phone_number'}
		if(!validator.isDate(user.date_of_birth))
			return {success: false, message: 'Not a valid date_of_birth'}
		if(!validator.isName(user.city))
			return {success: false, message: 'Not a valid city'}
		if(!validator.isEmail(user.email))
			return {success: false, message: 'Not a valid email'}
		if(!validator.isMarital(user.marital_status))
			return {success: false, message: 'Not a valid marital_status'}
		if(!validator.isGender(user.gender))
			return {success: false, message: 'Not a valid gender'}

		return {success: true, message: 'This is a valid user'}
	}
}
