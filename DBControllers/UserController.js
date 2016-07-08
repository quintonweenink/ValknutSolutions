var models = require("../models");
var express = require('express');

module.exports = {
 createUser : function createUser(newUser)
{
			var new_user = models.User.create({
							firstName: newUser.firstName,
							lastName: newUser.lastName,
							contactNumber : newUser.contactNumber,
							mobileNumber : newUser.mobileNumber,
							maritalStatus : newUser.maritalStatus,
							dateOfBirth : newUser.dateOfBirth,
							gender : newUser.gender,
							location : newUser.location,
							email : newUser.email
		});
		return new_user;
}
};
