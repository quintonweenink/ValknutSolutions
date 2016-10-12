"use strict"
var models = require("../../models");
var express = require('express');

const generateToken = require('../auth/auth').generateToken
const hashing = require('../hashing/hashing')

module.exports = {
	createAnalyst : function createAnalyst(newUser)
	{
		var salt = hashing.genRandomString(16) /** Gives us salt of length 16 */
    	var passwordData = hashing.sha512(newUser.password, salt)
		newUser.salt = salt
		newUser.password = passwordData.passwordHash
		var new_user = models.Analyst.findOrCreate({where: {email: newUser.email},
			defaults: newUser})
		  .spread(function(user, created) {
			console.log(user.get({
			  plain: true
				}));
			return user;
		});
		return new_user;
	},
	getAnalystById : function getAnalystById(id)
	{
		var get_analyst = models.Analyst.findById(id);
		if(get_analyst)
			return get_analyst;
		else
			return null

	},
	validateAnalyst : function validateAnalyst(canEmail, canPass, res)
	{



		var user = models.Analyst.findOne({
			where: {
				email: canEmail
			},
      		defaults: null
	}).then(function(get_nonvalid_user) {

				console.log(get_nonvalid_user)

				if(get_nonvalid_user != null){
					if(get_nonvalid_user.dataValues){

						var salt = get_nonvalid_user.dataValues.salt
				    	var passwordData = hashing.sha512(canPass, salt)

						if(passwordData.passwordHash == get_nonvalid_user.dataValues.password)
							res.json(generateToken(get_nonvalid_user))
						else
							res.json({success:false, message: "invalid password"})

					}
				}
				else
					res.json({success:false, message: "invalid email"})


	  })

	}

};
