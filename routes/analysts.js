var express = require('express');

var models = require("../models");

var analystController = require("../controllers/db/AnalystController");
var email = require("../controllers/email/email");
var jwt = require('jsonwebtoken');
var util = require('util');
var fs = require('fs');

const authenticate = require('../controllers/auth/auth')

var auth = require('../config/auth')

module.exports = function(app, passport){

	app.route('/api/analyst/authenticate')
	//User Post route
	.post(function(req, res) {

			if(req.body.email && req.body.password)
				analystController.validateAnalyst(req.body.email, req.body.password).then(function(user){

					if (!user){
						res.json({ success: false, message: 'Authentication failed. Analyst not found'})
						return null
					}
					else {
						var newtoken = jwt.sign(user.dataValues, auth.secret, {
				          expiresIn: 1440 // expires in 24 hours
				        })
						res.json({ success: true,
									message: 'Token is provided',
									token: newtoken })
						return user;
					}
				});
			else
				res.json({success: false,
						message: 'Incorrect usage of api'});
	});

	app.route('/api/analyst')
	//User Post route
    .post(function(req, res) {
			var newAnalyst = {
				email: 'quinton@gmail.com',
				password: 'randompass'
			};

			if(req.body.email && req.body.password)
			{
				newAnalyst.email = req.body.email;
				newAnalyst.password = req.body.password;
			}

			analystController.createAnalyst(newAnalyst)
			.then(function(analyst){
        		res.json(analyst.dataValues);
    		})
			.catch(function(error){
         		console.log("ops: " + error);
         		res.status(500).json({ error: 'error' });
     		});
	})
	//User Get route
    .get(function(req, res) {
			models.Analyst.findAll().then(function(users){
				res.json(users);
		});
		//Logic for returning all users
	});
};
