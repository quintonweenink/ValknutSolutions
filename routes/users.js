var express = require('express');

var models = require("../models");

var userController = require("../DBControllers/UserController");
var adminController = require("../DBControllers/AdminController");
var analystController = require("../DBControllers/AnalystController");
var pageController = require("../DBControllers/PageController");
var advertisementCotroller = require("../DBControllers/AdvertisementController");
var leadController = require("../DBControllers/LeadController");
var email = require("../email/email");
var jwt = require('jsonwebtoken');
var util = require('util');
var fs = require('fs');
var fbControllers = require("../fbControllers/fbController.js");

module.exports = function(app, passport){

	app.route('/api/user')
	//User Post route
    .post(function(req, res) {
			var user = {
				first_name : "Kevin",
				last_name : "Heritage",
				phone_number : "+27767405640",
				marital_status : "single",
				date_of_birth : "1994-06-06 00:00:00+02",
				gender : "male",
				city : "Pretoria",
				email : "kheritage222@gmail.com"
			};
			var fun = (function(id){
				console.log();
			});
			var testing = "hello there simpson";
			var output = JSON.stringify(userController.createUser(user, function(id){
				console.log(testing);
				//res.send({success : id});
			}));
			/*
			userController.createUser(newUser)
			.then(function(users){
        res.json(users.dataValues);
    }) .catch(function(error){
         console.log("ops: " + error);
         res.status(500).json({ error: 'error' });
     });*/
	})
	//User Get route
    .get(function(req, res) {

			models.User.findAll().then(function(users){
				res.json(users);
		});
		//Logic for returning all users
	});

	//User Specific ID route
	app.route('/api/user/:user_id')
	//User ID Get route
    .get(function(req, res) {
		models.User.findById(req.params.user_id).then(function(user){
		res.json(user);
		});
    })

	//User ID update route
	.put(function(req, res) {
        res.json({ message: 'User updated!',
					ID: req.params.user_id });
		//Logic for updating a user
    })

	//User ID delete route
	.delete(function(req, res) {
			var id = req.params.user_id;
			console.log(id);
	userController.deleteUserByID(id).then(function(user){
		res.json({ message: 'User deleted!',
					ID: req.params.user_id });
				});
		//Logic for updating a user
	});

};







	
