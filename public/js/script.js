var InsuranceProfiling = angular.module('InsuranceProfiling', ['ngRoute','chart.js','ngMaterial']);

// configure our routes
InsuranceProfiling.config(function($routeProvider) {
	$routeProvider

	// route for the home page
	.when('/', {
		templateUrl : 'views/pages/home.html',
		controller  : 'mainController'
	})

	// route for the about page
	.when('/about', {
		templateUrl : 'views/pages/about.html',
		controller  : 'aboutController'
	})

	// route for the contact page
	.when('/login', {
		templateUrl : 'views/pages/login.html',
		controller  : 'loginController'
	})
	//route for login_form
	.when('/login_form',
	{
		templateUrl : 'views/pages/login_form.html',
		controller  : 'loginFormController'
	})
	//signup route
	.when('/signup',
	{
		templateUrl : 'views/pages/signup.html',
		controller  : 'signupController'
	})
	//"valuables" test route
	.when('/graph',
	{
		templateUrl : 'views/pages/graph.html',
		controller  : 'graphController'
	})
	.when('/filter',
	{
		templateUrl : 'views/pages/filter.html',
		controller : 'filterController'
	})

	;
});

// create the controller and inject Angular's $scope
InsuranceProfiling.controller('mainController', function($scope) {
	// create a message to display in our view
	$scope.message = 'Main Controller';
});

InsuranceProfiling.controller('aboutController', function($scope) {
	$scope.message = 'Some information';
});

InsuranceProfiling.controller('loginController', function($scope) {
	$scope.message = 'Login Page My friends';
});

InsuranceProfiling.controller('loginFormController', function($scope) {
	$scope.message = 'Error will be shown here my friends';
});

InsuranceProfiling.controller('signupController', function($scope) {
	$scope.message = '';
});

function getAge(dateString)
{
	var today = new Date();
	var birthDate = new Date(dateString);
	var age = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
	{
		age--;
	}
	return age;
}

InsuranceProfiling.controller('filterController',function($scope, $http)
{
	var totalMale = 0;
	var totalFemale = 0;
	var totalOther = 0;
	var Ages = [0,0];
	var cities = [];
	var cityCount = [];
	$http.get("/api/user")
	.then(function(response){

		var users = response.data;
		for (var i = 0; i < users.length; i++)
		{
			var user = users[i];
			//GENDER GRAPH
			if(user.gender == "male")
			{
				totalMale++;
			}
			if(user.gender == "female")
			{
				totalFemale++;
			}
			if(user.gender != "male" && user.gender != "female")
			{
				totalOther++;
			}
			//CITY GRAPh
			if(cities.indexOf(user.city) == -1)
			{
				cities.push(user.city);
				cityCount.push(1);
			}
			else
			{
				cityCount[cities.indexOf(user.city)]++;
			}
			//AGE GRAPH
			var Age = getAge(user.dateOfBirth);
			if(Age < 25 && Age >=18)
			{
				Ages[0]++;
			}
			else if(Age >=25)
			{
				Ages[1]++;
			}

			//TODO:  Add grah types
		}
	});

	$scope.message = "";
	$scope.data = [];
	$scope.labels = [];
	$scope.data.group1 = "Age";
	$scope.data.graphType = "Pie";

	$scope.submit = function(){
		$scope.message = "";
		if($scope.data.graphType == "Pie")
		{
		$scope.showPie = true;
		$scope.showBar = false;
		}
		else
		if($scope.data.graphType == "Bar")
		{
		$scope.showBar = true;
		$scope.showPie = false;
		}

		//$scope.message = $scope.data.group1;

		// $scope.message = "Total male: "+ totalMale +" Total Female: " +totalFemale
		// + "Cities: " + cities[1] + "City count:" + cityCount[1];

		//	$scope.message = "CITIES "+ JSON.stringify(cities) + "COUNT "+JSON.stringify(cityCount);

		// if($scope.data.cb1==true && $scope.data.cb2==false)
		// {
		// 	$scope.labels = ["Age"];
		// 	$scope.data = [10]
		// }
		//
		// if($scope.data.cb1==false && $scope.data.cb2==true)
		// {
		// 	$scope.labels = ["Male","Female"];
		// 	$scope.data = [totalMale,totalFemale];
		// }
		//
		// if($scope.data.cb1==true && $scope.data.cb2==true)
		// {
		// 	$scope.labels = ["Age","Gender"];
		// 	$scope.data = [20,20];
		// }
		//
		//  if($scope.data.cb3==true && $scope.data.cb2==false && $scope.data.cb1==false)
		// {
		// 	$scope.labels = ["Age","Lel"];
		// 	$scope.data = [30]
		// }
		if($scope.data.group1=="Age")
		{
			$scope.labels = ["18-25",">25"];
			$scope.labels1 = ["18-25",">25"];
			$scope.data = Ages;
			$scope.data1 = Ages;
			$scope.options = {
				title: {
					display: true,
					text:  "Age"
				},
				legend: {
					display: true,
					labels: {
						fontColor: 'rgb(255, 99, 132)'
					}
				},
				scales: {
					yAxes: [{
						display: true,
						ticks: {
							suggestedMin: 0    // minimum will be 0, unless there is a lower value.
						}
					}]
				}
			};
			$scope.options1 = {
				title: {
					display: true,
					text:  "Age"
				},
				scales: {
					yAxes: [{
						display: true,
						ticks: {
							suggestedMin: 0    // minimum will be 0, unless there is a lower value.
						}
					}]
				}
			};
		}
		if($scope.data.group1=="Gender")
		{
			$scope.labels = ["Male","Female","Other"];
			$scope.labels1 = ["Male","Female","Other"];
			$scope.data = [totalMale,totalFemale,totalOther];
			$scope.data1 = [totalMale,totalFemale,totalOther];
			$scope.options = {
				title: {
					display: true,
					text:  "Gender"
				},
				legend: {
					display: true,
					labels: {
						fontColor: 'rgb(255, 99, 132)'
					}
				},
				scales: {
					yAxes: [{
						display: true,
						ticks: {
							suggestedMin: 0    // minimum will be 0, unless there is a lower value.
						}
					}]
				}
			};
			$scope.options1 = {
				title: {
					display: true,
					text:  "Gender"
				},
				scales: {
					yAxes: [{
						display: true,
						ticks: {
							suggestedMin: 0    // minimum will be 0, unless there is a lower value.
						}
					}]
				}
			};
		}

		if($scope.data.group1=="Location")
		{
			$scope.labels = cities;
			$scope.labels1 = cities;
			$scope.data = cityCount;
			$scope.data1= cityCount;
			$scope.options = {
				title: {
					display: true,
					text:  "Location"
				},
				legend: {
					display: true,
					labels: {
						fontColor: 'rgb(255, 99, 132)'
					}
				},
				scales: {
					yAxes: [{
						display: true,
						ticks: {
							suggestedMin: 0    // minimum will be 0, unless there is a lower value.
						}
					}]
				}
			};

			$scope.options1 = {
				title: {
					display: true,
					text:  "Location"
				},
				scales: {
					yAxes: [{
						display: true,
						ticks: {
							suggestedMin: 0    // minimum will be 0, unless there is a lower value.
						}
					}]
				}
			};
		}


	};

});

InsuranceProfiling.controller('graphController', function($scope) {
	$scope.message = 'This is the Graph page (passed from controller as message )';
});


InsuranceProfiling.controller('SelectedTextController', function($scope) {
	$scope.items = ["Location", "Age"];
	$scope.selectedItem;
	$scope.getSelectedText = function() {
		if ($scope.selectedItem !== undefined) {
			return "You have selected:" + $scope.selectedItem;
		} else {
			return "Please select a filter";
		}
	};
});

InsuranceProfiling.controller("PieCtrl",
function ($scope) {
	$scope.labels = ["Age", "Time"];
	$scope.data = [20, 100];
});

InsuranceProfiling.controller("BubbleCtrl",
function ($scope) {
	$scope.series = ['Lelelelele A', 'Series B'];

	$scope.data = [
		[{
			x: 25,
			y: 24,
			r: 50
		}],
		[{
			x: 23,
			y: 20,
			r: 50
		}]
	];
});



InsuranceProfiling.controller("LineCtrl",
function ($scope) {
	$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
	$scope.series = ['Series A', 'Series B'];
	$scope.data = [
		[65, 59, 80, 81, 56, 55, 40],
		[28, 48, 40, 19, 86, 27, 90]
	];
	$scope.onClick = function (points, evt) {
		console.log(points, evt);
	};
	$scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
	$scope.options = {
		scales: {
			yAxes: [
				{
					id: 'y-axis-1',
					type: 'linear',
					display: true,
					position: 'left'
				},
				{
					id: 'y-axis-2',
					type: 'linear',
					display: true,
					position: 'right'
				}
			]
		}
	};
});
