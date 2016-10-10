"use strict"
var express = require('express');

var models = require("../models");


var userController = require("../controllers/db/UserController");
var email = require("../controllers/email/email");
var jwt = require('jsonwebtoken');
var util = require('util');
var fs = require('fs');
var fbControllers = require("../controllers/fb/fbController.js");

const emptyUser = require('../config/objects/user')
const userJSON = JSON.parse(JSON.stringify(emptyUser))

const authenticate = require('../controllers/auth/auth').authenticate

const objectValidate = require('../controllers/validation/fullValidation').objectValidate

const objectNormalize = require('../controllers/validation/fullNormalize').objectNormalize


module.exports = function(app, passport,io){
	app.route('/api/user')
		//User Post route
	    .post(function(req, res) {

				var newUser = emptyUser.clone(userJSON)

				if(req.body.first_name)
				{
					newUser.first_name = req.body.first_name;
					newUser.last_name = req.body.last_name;
					newUser.phone_number = decodeURIComponent(req.body.phone_number);
					newUser.marital_status = req.body.marital_status.toLowerCase();
					newUser.date_of_birth = req.body.date_of_birth;
					newUser.gender = req.body.gender.toLowerCase();
					newUser.city = req.body.city.toLowerCase();
					newUser.email = req.body.email.toLowerCase();
				}

				if(req.body.from)
					newUser.from = req.body.from

				let resObj = objectValidate(newUser)
				//console.log(resObj)

				if(!resObj.success)
				{
					console.log(newUser)
					res.send(resObj);
					return resObj
				}

				newUser = objectNormalize(newUser)

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
	    .get(authenticate, function(req, res) {
				models.User.findAll().then(function(users){
					res.json({success: true, message: 'Sucessfully got users', users: users});
				});
				//Logic for returning all users
			}
		);

	//User Specific ID route
	app.route('/api/user/:user_id')
	//User ID Get route
    .get(function(req, res) {
		userController.process(req.params.user_id).then(function(user){
			res.json(user);
		});
    })

	//User ID update route
	.put(function(req, res) {
		userController.process(req.params.user_id).then(function(user){
			res.json({success:true, message:'User is marked as processed'});
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
