var InsuranceProfiling = angular.module('InsuranceProfiling', ['ngRoute','chart.js']);
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

InsuranceProfiling.controller('graphController', function($scope) {
	$scope.message = '';
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
