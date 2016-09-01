var models = require("../models");
var express = require('express');

module.exports = {
	createAnalyst : function createAnalyst(newUser)
	{
			var new_analyst = models.Analyst.create({
								email: newUser.email,
								password: newUser.password,
			});
			return new_user;
	},
	getAnalystById : function getAnalystById(id)
	{
		var get_analyst = models.Analyst.findById(id);
		if(get_analyst)
			return get_analyst;
		else
			return null;

	},
	validateAnalyst : function validateAnalyst(canEmail, canPass)
	{
			var canUser = models.Analyst.findOne({where: {
				email : canEmail
			}});
			if(canUser)
				if(canUser.password == canPass)
					return canUser;
				
			return null;
	}
};
