var express = require('express');

var models = require("../models");

var userController = require("../DBControllers/UserController");


module.exports = function(app, passport){
//TODO: 
	app.route('/api/graph/Location')
	.get(function(req, res) {
		models.User.findAll().then(function(users){
			var cities = [];
			var cityCount = [];
			for (var i = 0; i < users.length; i++)
			{
				var user = users[i];
				if(cities.indexOf(user.city) == -1)
				{
					cities.push(user.city);
					cityCount.push(1);
				}
				else
				{
					cityCount[cities.indexOf(user.city)]++;
				}
			}

			var GraphObject = new Object;
			GraphObject.labels = cities;
			GraphObject.data = cityCount;

			res.json(GraphObject);
		});
	});

	app.route('/api/graph/Age')
	//User Post route
	.get(function(req, res) {
		models.User.findAll().then(function(users){
			for (var i = 0; i < users.length; i++)
			{
				var user = users[i];
				var Age = user.dateOfBirth;
		//	var Age = getAge(user.dateOfBirth);
			console.log(users);
			}
			res.json(Age);
		});
	});



};
