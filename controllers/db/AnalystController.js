var models = require("../../models");
var express = require('express');

module.exports = {
	createAnalyst : function createAnalyst(newUser)
	{
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
	validateAnalyst : function validateAnalyst(canEmail, canPass)
	{
		var get_user = models.Analyst.findOne({where: {
			email: canEmail,
			password: canPass
		}},function(user){
			console.log(user.dataValues)
		});
		if(get_user){
			return get_user
		}
		else
			return null;
	}
};
