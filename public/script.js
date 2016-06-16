	// create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ngRoute']);

	// configure our routes
	scotchApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/about', {
				templateUrl : 'pages/about.html',
				controller  : 'aboutController'
			})

			// route for the contact page
			.when('/login', {
				templateUrl : 'pages/login.html',
				controller  : 'loginController'
			})
			.when('/login_form',
			{
				templateUrl : 'pages/login_form.html',
				controller  : 'loginFormController'
			})
			
			.when('/signup',
			{
				templateUrl : 'pages/signup.html',
				controller  : 'signupController'
			})
			
			;
	});

	// create the controller and inject Angular's $scope
	scotchApp.controller('mainController', function($scope) {
		// create a message to display in our view
		$scope.message = 'Everyone come and see how good I look!';
	});

	scotchApp.controller('aboutController', function($scope) {
		$scope.message = 'Some information';
	});

	scotchApp.controller('loginController', function($scope) {
		$scope.message = 'Contact Page My friends';
	});
	
	scotchApp.controller('loginFormController', function($scope) {
		$scope.message = 'Error will be shown here my friends';
	});
	
	scotchApp.controller('signupController', function($scope) {
		$scope.message = '';
	});
	