var express = require('express');

var models = require("../models");

var userController = require("../DBControllers/UserController");
var email = require("../email/email");
var jwt = require('jsonwebtoken');
var util = require('util');
var fs = require('fs');
var fbControllers = require("../fbControllers/fbController.js");

module.exports = function(app, passport){


	app.route('/messenger/webhook')
	.post(function(req, res) {
		console.log('post');
		res.send('Hello world');
	})
    .get(function(req, res) {
    	console.log("get");
		if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === 'this-is-a-shitty-token') {
		    console.log("Validating webhook");
		    res.status(200).send(req.query['hub.challenge']);
		} else {
		    console.error("Failed validation. Make sure the validation tokens match.");
		    res.sendStatus(403);          
  		}  
	});


};
