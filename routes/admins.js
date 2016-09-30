var express = require('express');

var models = require("../models");

var adminController = require("../controllers/db/AdminController");
var email = require("../controllers/email/email");
var jwt = require('jsonwebtoken');
var util = require('util');
var fs = require('fs');

const authenticate = require('../controllers/auth/auth').authenticate

module.exports = function(app, passport){

	app.route('/api/admin')
		//User Post route
	    .post(function(req, res) {
				var newAdmin = {
					email: 'admin@gmail.com',
					password: 'NoPass'
				};
				adminController.createAdmin(newAdmin)
				.then(function(admin){
	        		res.json(admin.dataValues);
	    		})
	    		.catch(function(error){
			         console.log("ops: " + error);
			         res.status(500).json({ error: 'error' });
	     	});
		})
		//User Get route
	    .get(function(req, res) {
				models.Admin.findAll().then(function(admins){
					res.json(admins);
				});
			//Logic for returning all users
			}
		);

};
