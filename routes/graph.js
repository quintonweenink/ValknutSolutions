var express = require('express');

var models = require("../models");

var userController = require("../controllers/db/UserController");

var DateController = require("../controllers/date/Date")

module.exports =	function(app, passport){
	app.route('/api/graph/location')
	.get(function(req,res){
		res.json("Please supply a chart type: eg. /location/pie");
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

	app.route('/api/graph/location/:type')
	.get(function(req, res) {
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


	app.route('/api/graph/age')
	.get(function(req,res){
		res.json("Please supply a chart type: eg. /age/pie");
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

	app.route('/api/graph/age/:type')
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

	app.route('/api/graph/marital')
	.get(function(req,res){
		res.json("Please supply a chart type: eg. /marital/pie");
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

	app.route('/api/graph/gender')
	.get(function(req,res){
		res.json("Please supply a chart type: eg. /gender/pie");
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

		app.route('/api/graph/SignupsPerYear/')
		.get(function(req,res){
			res.json("Please supply a chart type: eg. SignupsPerYear/line");
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

		app.route('/api/graph/SignupsPerYear/:type')
		.get(function(req, res) {
			models.User.findAll().then(
				function(users){
					var year = [];
					var yearCount = [];
					for (var i = 0; i < users.length; i++)
					{
						var user = users[i];
						var Status = DateController.getYear(user.createdAt);
						if(year.indexOf(Status) == -1)
						{
							year.push(Status);
							yearCount.push(1);
						}
						else
						{
							yearCount[year.indexOf(Status)]++;
						}
					}
					var GraphObject = new Object;
					GraphObject.labels = year;
					GraphObject.data = yearCount;
					if(req.params.type == "pie")
					{
						GraphObject.options =
						{
							title: {
								display: true,
								text:  "Signups Per Year"
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
								text:  "Signups Per Year"
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
								text:  "Signups Per Year"
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


			app.route('/api/graph/SignupsYesterday/')
			.get(function(req,res){
				res.json("Please supply a chart type: eg. SignupsYesterday/line");
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

			app.route('/api/graph/SignupsYesterday/:type')
			.get(function(req, res) {
					models.User.findAll().then(
						function(users){
							var integration = [];
							var integrationCount = [];

							var yesterday = DateController.getYesterday();

							for (var i = 0; i < users.length; i++)
							{
								var user = users[i];
								var Status = user.from;
								if(integration.indexOf(Status) == -1)
								{
									if(DateController.getDay(user.createdAt) == DateController.getDay(yesterday))
									{
									integration.push(Status);
									integrationCount.push(1);
									}
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
									text:  "Signups Yesterday"
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
									text:  "Signups Yesterday"
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
									text:  "Signups Yesterday"
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
