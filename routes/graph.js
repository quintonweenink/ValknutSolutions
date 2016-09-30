var express = require('express');

var models = require("../models");

var userController = require("../controllers/db/UserController");

var DateController = require("../controllers/date/Date")

const authenticate = require('../controllers/auth/auth').authenticate

module.exports = function(app, passport){
	app.route('/api/graph/location')
	.get(function(req,res){
		res.json("Please supply a chart type: eg. /location/pie");
	});
	app.route('/api/graph/location/:type')
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
			if(req.params.type == "pie")
			{
				GraphObject.options =
				{
					title: {
						display: true,
						text:  "Location"
					},
					legend: {
						display: true,
						labels: {
							fontColor: 'rgb(255, 99, 132)'
						}
					}
				};
			}
			else if(req.params.type == "bar")
			{
				GraphObject.options =
				{
					title: {
						display: true,
						text:  "Location"
					},
					scales: {
						yAxes: [{
							display: true,
							ticks: {
								suggestedMin: 0,  // minimum will be 0, unless there is a lower value.
								stepSize: 1
							}
						}]
					}
				};
			}
			else
			{
				GraphObject.options =
				{
					title: {
						display: true,
						text:  "Location"
					}
				}
			}
			res.json(GraphObject);
		});
	});

	// function getAge(dateString)
	// {
	// 	var today = new Date();
	// 	var birthDate = new Date(dateString);
	// 	var age = today.getFullYear() - birthDate.getFullYear();
	// 	var m = today.getMonth() - birthDate.getMonth();
	// 	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
	// 	{
	// 		age--;
	// 	}
	// 	return age;
	// }

	app.route('/api/graph/age')
	.get(function(req,res){
		res.json("Please supply a chart type: eg. /age/pie");
	});

	app.route('/api/graph/age/:type')
	//User Post route
	.get(function(req, res) {
		models.User.findAll().then(function(users){
			var ages = [];
			var ageCount = [];
			for (var i = 0; i < users.length; i++)
			{
				var user = users[i];
				var Age = DateController.getAge(user.date_of_birth);
				if(ages.indexOf(Age) == -1)
				{
					ages.push(Age);
					ageCount.push(1);
				}
				else
				{
					ageCount[ages.indexOf(Age)]++;
				}
			}
			var GraphObject = new Object;
			GraphObject.labels = ages;
			GraphObject.data = ageCount;
			if(req.params.type == "pie")
			{
				GraphObject.options =
				{
					title: {
						display: true,
						text:  "Age"
					},
					legend: {
						display: true,
						labels: {
							fontColor: 'rgb(255, 99, 132)'
						}
					}
				};
			}
			else if(req.params.type == "bar")
			{
				GraphObject.options =
				{
					title: {
						display: true,
						text:  "Age"
					},
					scales: {
						yAxes: [{
							display: true,
							ticks: {
								suggestedMin: 0,
								stepSize: 1
							}
						}]
					}
				};
			}
			else
			{
				GraphObject.options =
				{
					title: {
						display: true,
						text:  "Age"
					}
				}
			}
			res.json(GraphObject);
		});
	});

	app.route('/api/graph/marital')
	.get(function(req,res){
		res.json("Please supply a chart type: eg. /marital/pie");
	});

	app.route('/api/graph/marital/:type')
	//User Post route
	.get(function(req, res) {
		models.User.findAll().then(function(users){
			var maritalStatus = [];
			var maritalCount = [];
			for (var i = 0; i < users.length; i++)
			{
				var user = users[i];
				var Status = user.marital_status.toUpperCase();
				if(maritalStatus.indexOf(Status) == -1)
				{
					maritalStatus.push(Status);
					maritalCount.push(1);
				}
				else
				{
					maritalCount[maritalStatus.indexOf(Status)]++;
				}
			}
			var GraphObject = new Object;
			GraphObject.labels = maritalStatus;
			GraphObject.data = maritalCount;
			if(req.params.type == "pie")
			{
				GraphObject.options =
				{
					title: {
						display: true,
						text:  "Marital Status"
					},
					legend: {
						display: true,
						labels: {
							fontColor: 'rgb(255, 99, 132)'
						}
					}
				};
			}
			else if(req.params.type == "bar")
			{
				GraphObject.options =
				{
					title: {
						display: true,
						text:  "Marital Status"
					},
					scales: {
						yAxes: [{
							display: true,
							ticks: {
								suggestedMin: 0,
								stepSize: 1
							}
						}]
					}
				};
			}
			else
			{
				GraphObject.options =
				{
					title: {
						display: true,
						text:  "Marital Status"
					}
				}
			}
			res.json(GraphObject);
		});
	});

	app.route('/api/graph/gender')
	.get(function(req,res){
		res.json("Please supply a chart type: eg. /gender/pie");
	});

	app.route('/api/graph/gender/:type')
	//User Post route
	.get(function(req, res) {
		models.User.findAll().then(function(users){
			var gender = [];
			var genderCount = [];
			for (var i = 0; i < users.length; i++)
			{
				var user = users[i];
				var Status = user.gender.toUpperCase();
				if(gender.indexOf(Status) == -1)
				{
					gender.push(Status);
					genderCount.push(1);
				}
				else
				{
					genderCount[gender.indexOf(Status)]++;
				}
			}
			var GraphObject = new Object;
			GraphObject.labels = gender;
			GraphObject.data = genderCount;
			if(req.params.type == "pie")
			{
				GraphObject.options =
				{
					title: {
						display: true,
						text:  "Gender"
					},
					legend: {
						display: true,
						labels: {
							fontColor: 'rgb(255, 99, 132)'
						}
					}
				};
			}
			else if(req.params.type == "bar")
			{
				GraphObject.options =
				{
					title: {
						display: true,
						text:  "Gender"
					},
					scales: {
						yAxes: [{
							display: true,
							ticks: {
								suggestedMin: 0,
								stepSize: 1
							}
						}]
					}
				};
			}
			else
			{
				GraphObject.options =
				{
					title: {
						display: true,
						text:  "Gender"
					}
				}
			}
			res.json(GraphObject);
		});
	});

// function getMonths(dateString)
// {
// 		var monthNames = ["January", "February", "March", "April", "May", "June",
// 		"July", "August", "September", "October", "November", "December"
// 	];
// 	var birthDate = new Date(dateString);
// 	var month = birthDate.getMonth()
// 	return monthNames[month];
// }

app.route('/api/graph/signups/')
//User Post route
.get(function(req, res) {
	models.User.findAll().then(function(users){
		var months = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];
	var monthCount = [];
	for(var j=0 ;j < months.length;j++)
	monthCount[j] = 0;

	for (var i = 0; i < users.length; i++)
	{
		var user = users[i];
		var Status = DateController.getMonths(user.createdAt);
		monthCount[months.indexOf(Status)]++;
	}

	var GraphObject = new Object;
	GraphObject.labels = months;
	GraphObject.data = monthCount;
	GraphObject.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-1'}];
	GraphObject.options =
	{
		title: {
			display: true,
			text:  "Signups per month"
		},
		scales:
		{
			yAxes:
			[
				{
					id: 'y-axis-1',
					type: 'linear',
					display: true,
					position: 'left',
					ticks: {
						suggestedMin: 0,
						stepSize: 1
					}
				}
			]
		}
	};
	res.json(GraphObject);
	});
	});

	app.route('/api/graph/SignupsPerDay/')
	//User Post route
	.get(function(req, res) {
		models.User.findAll().then(function(users){
			var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
			"Saturday"];
		var dayCount = [];
		for(var j=0 ;j < days.length;j++)
		dayCount[j] = 0;

		for (var i = 0; i < users.length; i++)
		{
			var user = users[i];
			var Status = DateController.getDay(user.createdAt);
			dayCount[days.indexOf(Status)]++;
		}

		var GraphObject = new Object;
		GraphObject.labels = days;
		GraphObject.data = dayCount;
		GraphObject.options =
		{
			title: {
				display: true,
				text:  "Signups Per Day"
			},
			legend: {
				display: true,
				labels: {
					fontColor: 'rgb(255, 99, 132)'
				}
			}
		};
		res.json(GraphObject);
		});

		});



};
