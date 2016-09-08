var models = require("../models");
var express = require('express');

var io = require('../bin/www');

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
			return user;
  		});
		io.on('connection', function(socket){
		    socket.on('new user', function(obj){
		        io.emit('new user', newUser)
		    })
		})
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
