var models = require("../../models");
var express = require('express');

var app = require('../../app');
var io = app.io;

module.exports = {
	createUser : function createUser(newUser)
	{
		//Update in found in db still to be done
		var new_user = models.User.findOrCreate({where: {email: newUser.email},
			defaults: newUser})
		  .spread(function(user, created) {
		    console.log(user.get({
		      plain: true
		  		}));
				io.emit('new user', user);
			return user;
  		});

		return new_user;
	},
	process : function process(user_id)
	{
		//Update in found in db still to be done
		var new_user = models.User.update({
			processed: true,
		},{
			where: {id: user_id}
		}
		)
		  .spread(function(user, created) {
			return user;
  		});

		return new_user;
	},
	deleteUserByID : function deleteUserByID(id)
	{
	  var delete_user = models.User.destroy({
	    where: {
	    id: id
	  }});
	  return delete_user;
	},
	getUserById : function getUserById(id)
	{
		var get_user = models.User.findById(id);
		if(get_user)
			return get_user;
		else
			return null;

	}
}
