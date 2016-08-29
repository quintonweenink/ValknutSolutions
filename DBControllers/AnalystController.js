var models = require("../models");
var express = require('express');

module.exports = {
	createAnalyst : function createAnalyst(newUser)
	{
				var new_user = models.Analyst.create({
								email: newUser.email,
								password: newUser.password,
			});
			return new_user;
	}
};
