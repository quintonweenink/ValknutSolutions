var models = require("../models");
var express = require('express');

module.exports = {
createUser : function createUser(user)
{
	models.User.findOrCreate({
		where: {
			firstName : user.firstName,
			lastName : user.lastName,
			contactNumber : user.contactNumber,
			mobileNumber : user.mobileNumber,
			maritalStatus : user.maritalStatus,
			dateOfBirth : user.dateOfBirth,
			gender : user.gender,
			location : user.location,
			email : user.email
		},
		defaults : {}
	})
	.spread(function(new_lead, created){
		console.log("New user :" + JSON.stringify(new_lead.get({plain: true})));
		console.log("Created field: " + JSON.stringify(created));
	});/*
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
		return new_user;*/
},
deleteUserByID : function deleteUserByID(id)
{
  var delete_user = models.User.destroy({
    where: {
    id: id
  }});
  return delete_user;
}
};
