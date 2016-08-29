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

	app.route('/api/admin')
	//User Post route
    .post(function(req, res) {
			var newAdmin = {
				email: 'a',
				password: 'lelelel'
		};
			adminController.createAdmin(newAdmin)
			.then(function(admin){
        res.json(admin.dataValues);
    }) .catch(function(error){
         console.log("ops: " + error);
         res.status(500).json({ error: 'error' });
     });
	})
	//User Get route
    .get(function(req, res) {
			models.Admin.findAll().then(function(users){
				res.json(users);
		});
		//Logic for returning all users
	});

};







	
