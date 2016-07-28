var models = require("../models");
var express = require('express');
var user_id;
module.exports = {
createUser : function createUser(user, callback)
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
	.spread(function(new_user, created){
		//console.log("New user :" + JSON.stringify(new_user.get({plain:true})));
		//console.log("Created field: " + JSON.stringify(created));
		callback(new_user.id);
		return new_user.id;
	});
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
