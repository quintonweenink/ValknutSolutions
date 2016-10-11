"use strict"

var jwt = require('jsonwebtoken')

var auth = require('../../config/auth')

const config = require('../../config/auth')

var normalize = require('./normalize')

module.exports = {
	objectNormalize : function(user){
		var normalizedObj = user

		normalizedObj.first_name = normalize.doNothing(user.first_name)
		normalizedObj.last_name = normalize.doNothing(user.last_name)
		normalizedObj.phone_number = normalize.toNoSpace(user.phone_number)
		normalizedObj.marital_status = normalize.toLower(user.marital_status)
		normalizedObj.date_of_birth = normalize.doNothing(user.date_of_birth)
		normalizedObj.gender = normalize.toLower(user.gender)
		normalizedObj.city = normalize.toLower(user.city)
		normalizedObj.email = normalize.toLower(user.email)

		return normalizedObj
	}
}
