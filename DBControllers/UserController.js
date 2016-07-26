var models = require("../models");
var express = require('express');

module.exports = {
createUser : function createUser(user)
{
	models.User.findOrCreate({
		where: {
			firstName : user.first_name,
			lastName : user.last_name,
			phoneNumber : user.phone_number,
			maritalStatus : user.marital_status,
			dateOfBirth : user.date_of_birth,
			gender : user.gender,
			city : user.city,
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
