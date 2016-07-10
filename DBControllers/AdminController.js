var models = require("../models");
var express = require('express');

module.exports = {
createAdmin : function createAdmin(newUser)
{
			var new_user = models.Admin.create({
							email: newUser.email,
							password: newUser.password,
		});
		return new_user;
}
};
