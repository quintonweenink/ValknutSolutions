
var express = require('express');

var models = require("../models");

var userController = require("../controllers/db/UserController");

var DateController = require("../controllers/date/Date")

module.exports =	function(app, passport){

	app.route('/api/graph/SignupsPerMonth/')
	.get(function(req,res){
		res.json("Please supply a chart type: eg. SignupsPerMonth/line");
	})
	.put(function(req, res) {
		res.json({ message: 'This route does not support put requests'	});
	})
	.post(function(req, res) {
		res.json({ message: 'This route does not support post requests'	});
	})
	.delete(function(req, res) {
		res.json({ message: 'This route does not support delete requests'});
	});

	app.route('/api/graph/SignupsPerMonth/:type')
	.get(function(req, res) {
		models.User.findAll().then(
			function(users){
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
			if(req.params.type == "pie")
			{
				GraphObject.options =
				{
					title: {
						display: true,
						text:  "Signups per month"
					},
					legend: {
						display: true,
						labels: {
							fontColor: 'rgb(255, 99, 132)'
						}
					}
				};
			}
			else if(req.params.type == "line")
			{
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
			}
			else
			{
				GraphObject.options =
				{
					title: {
						display: true,
						text:  "Signups per month"
					}
				}
			}
			res.json(GraphObject);
		});
	})
	.put(function(req, res) {
		res.json({ message: 'This route does not support put requests'	});
	})
	.post(function(req, res) {
		res.json({ message: 'This route does not support post requests'	});
	})
	.delete(function(req, res) {
		res.json({ message: 'This route does not support delete requests'});
	});


	app.route('/api/graph/SignupsPerDay/')
	.get(function(req,res){
		res.json("Please supply a chart type: eg. SignupsPerDay/pie");
	})
	.put(function(req, res) {
		res.json({ message: 'This route does not support put requests'	});
	})
	.post(function(req, res) {
		res.json({ message: 'This route does not support post requests'	});
	})
	.delete(function(req, res) {
		res.json({ message: 'This route does not support delete requests'});
	});


	app.route('/api/graph/SignupsPerDay/:type')
	.get(function(req, res) {
		models.User.findAll().then(
			function(users){
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
				if(req.params.type == "pie")
				{
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
				}
				else if(req.params.type == "bar")
				{
					GraphObject.options =
						{
							title: {
								display: true,
								text:  "Signups Per Day"
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
				}
				else
				{
					GraphObject.options =
					{
						title: {
							display: true,
							text:  "Signups Per Day"
						}
					}
				}
				res.json(GraphObject);
			});
		})
		.put(function(req, res) {
			res.json({ message: 'This route does not support put requests'});
		})
		.post(function(req, res) {
			res.json({ message: 'This route does not support post requests'});
		})
		.delete(function(req, res) {
			res.json({ message: 'This route does not support delete requests'});
		});

};
