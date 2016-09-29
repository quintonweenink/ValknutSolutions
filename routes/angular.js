var express = require('express');

var models = require("../models");

var adminController = require("../controllers/db/AdminController");
var email = require("../controllers/email/email");
var jwt = require('jsonwebtoken');
var util = require('util');
var fs = require('fs');

const authenticate = require('../controllers/auth/auth')

module.exports = function(app, passport){

	//-------------Angular Routes-----------------//
	  app.get('*', function(req, res) {
        res.sendfile('./public/views/pages/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

};
