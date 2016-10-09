
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


		app.route('/api/graph/FromWhere/')
		.get(function(req,res){
			res.json("Please supply a chart type: eg. FromWhere/pie");
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

		app.route('/api/graph/FromWhere/:type')
		.get(function(req, res) {
			models.User.findAll().then(
				function(users){
					var integration = [];
					var integrationCount = [];
					for (var i = 0; i < users.length; i++)
					{
						var user = users[i];
						var Status = user.from;
						if(integration.indexOf(Status) == -1)
						{
							integration.push(Status);
							integrationCount.push(1);
						}
						else
						{
							integrationCount[integration.indexOf(Status)]++;
						}
					}
					var GraphObject = new Object;
					GraphObject.labels = integration;
					GraphObject.data = integrationCount;
					if(req.params.type == "pie")
					{
						GraphObject.options =
						{
							title: {
								display: true,
								text:  "From Which Integration"
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
								text:  "From Which Integration"
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
								text:  "From Which Integration"
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


			app.route('/api/graph/ProcessedCount/')
			.get(function(req, res) {
				models.User.findAll().then(
					function(users){
						var totalCount = users.length;
						var processedCount = 0;
						for (var i = 0; i < users.length; i++)
						{
							var user = users[i];
							if(user.processed==true)
							{
								processedCount++;
							}
						}

						totalCount = totalCount - processedCount;
						var GraphObject = new Object;

						GraphObject.labels = ['Unprocessed', 'Processed'];
						GraphObject.data = [totalCount, processedCount];
							GraphObject.options =
							{
								title: {
									display: true,
									text:  "Unprocessed vs Processed"
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



			/*********************Geo Chart route*****************/
			app.route('/api/graph/Geochart/')
			.get(function(req,res){

					models.User.findAll().then(function(users){
						var cities = [];
						var cityCount = [];
						for (var i = 0; i < users.length; i++)
						{
							var user = users[i];
							if(cities.indexOf(user.city.toUpperCase()) == -1)
							{
								cities.push(user.city.toUpperCase());
								cityCount.push(1);
							}
							else
							{
								cityCount[cities.indexOf(user.city.toUpperCase())]++;
							}
						}

						var arr2 = new Array();
						arr2[0] = new Array(2);
						arr2[0][0] = 'City';
						arr2[0][1] = 'Users';
							for (var i=0; i < cities.length;i++)
							{
								arr2[i+1] = new Array(2);
								arr2[i+1][0] = cities[i];
								arr2[i+1][1] = cityCount[i];
							}
						var GraphObject = new Object;

						GraphObject.data = arr2;
						GraphObject.options =
						{
							region: 'ZA',
							legend : {textStyle: {color: 'blue', fontSize: 16}},
							// resolution : 'provinces',
							backgroundColor: '#86c5da',
							datalessRegionColor : '#FEE8D6',
							// height : 600,
							// keepAspectRatio : true,
							displayMode: 'markers',
							markerOpacity : 0.7,
						 	sizeAxis : { maxSize: 15, minSize: 5},
							colorAxis: {colors: ['red','green', 'blue']}
						}
						res.json(GraphObject);
					}

				);

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



			app.route('/api/graph/GeoChartCountry/')
			.get(function(req,res){

					models.User.findAll().then(function(users){
						var countries = [];
						var countryCount = [];

						//TODO: Replace South Africa with user.country

						// for (var i = 0; i < users.length; i++)
						// {
						// 	var user = users[i];
						// 	if(countries.indexOf("user.country") == -1)
						// 	{
						// 		countries.push(user.country);
						// 		countryCount.push(1);
						// 	}
						// 	else
						// 	{
						// 		countryCount[countries.indexOf(user.country)]++;
						// 	}
						// }

						for (var i = 0; i < users.length; i++)
						{
							var user = users[i];
							if(countries.indexOf("South Africa") == -1)
							{
								countries.push("South Africa");
								countryCount.push(1);
							}
							else
							{
								countryCount[countries.indexOf("South Africa")]++;
							}
						}

						var arr2 = new Array();
						arr2[0] = new Array(2);
						arr2[0][0] = 'Country';
						arr2[0][1] = 'Users';
							for (var i=0; i < countries.length;i++)
							{
								arr2[i+1] = new Array(2);
								arr2[i+1][0] = countries[i];
								arr2[i+1][1] = countryCount[i];
							}
						var GraphObject = new Object;

						GraphObject.data = arr2;
						GraphObject.options =
						{
								region: '002',
								resolution : 'countries',
								backgroundColor: '#86c5da',
								datalessRegionColor : '#FEE8D6',
								displayMode: 'region',
								// markerOpacity : 0.7,
								// sizeAxis : { maxSize: 15, minSize: 5},
								// colorAxis: {colors: ['red','green', 'blue']}
						};
						res.json(GraphObject);
					}

				);

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








};
