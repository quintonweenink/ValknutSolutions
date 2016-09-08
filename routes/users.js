var express = require('express');

var models = require("../models");

var userController = require("../DBControllers/UserController");
var email = require("../email/email");
var jwt = require('jsonwebtoken');
var util = require('util');
var fs = require('fs');
var fbControllers = require("../fbControllers/fbController.js");

module.exports = function(app, passport){
	app.route('/api/user')
		//User Post route
	    .post(function(req, res) {

				//This should be removed before release
				/**/
				var newUser = {
					first_name : 'Kevin',
					last_name : 'Heritage',
					phone_number : '+27767405640',
					marital_status : 'single',
					date_of_birth : '1994-06-06 00:00:00+02',
					gender : 'male',
					city : 'Pretoria',
					email : 'kheritage222@gmail.com'
				};
				/**/

				//Auto insert data according to passed data
				if(req.body.first_name)
				{
					newUser.first_name = req.body.first_name;
					newUser.last_name = req.body.last_name;
					newUser.phone_number = req.body.phone_number;
					newUser.marital_status = req.body.marital_status;
					newUser.date_of_birth = req.body.date_of_birth;
					newUser.gender = req.body.gender;
					newUser.city = req.body.city;
					newUser.email = req.body.email;
				}

				userController.createUser(newUser)
				.then(function(user){
	        		res.json(user.dataValues);
	    		})
	    		.catch(function(error){
			         console.log("ops: " + error);
			         res.status(500).json({ error: 'error' });
	    	 });
		})
		//User Get route
	    .get(function(req, res) {
				models.User.findAll().then(function(users){
					res.json(users);
				});
				//Logic for returning all users
			}
		);

	//User Specific ID route
	app.route('/api/user/:user_id')
	//User ID Get route
    .get(function(req, res) {
		userController.getUserById(req.params.user_id).then(function(user){
			res.json(user);
		});
    })

	//User ID update route
	.put(function(req, res) {
        res.json({ message: 'User updated!',
			ID: req.params.user_id
		});
		//Logic for updating a user
    })

	//User ID delete route
	.delete(function(req, res) {
		var id = req.params.user_id;
		console.log(id);
		userController.deleteUserByID(id).then(function(user){
				res.json({ message: 'User deleted!',
				ID: req.params.user_id
			});
		});
		//Logic for updating a user
	});

};
