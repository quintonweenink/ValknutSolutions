	// create the module and name it scotchApp
	var InsuranceProfiling = angular.module('InsuranceProfiling', ['ngRoute']);

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
			.when('/login_form',
			{
				templateUrl : 'views/pages/login_form.html',
				controller  : 'loginFormController'
			})
			
			.when('/signup',
			{
				templateUrl : 'views/pages/signup.html',
				controller  : 'signupController'
			})

			.when('/valuables',
			{
				templateUrl : 'views/pages/valuables.html',
				controller  : 'valuablesController'
			})
			
			;
	});

	// create the controller and inject Angular's $scope
	InsuranceProfiling.controller('mainController', function($scope) {
		// create a message to display in our view
		$scope.message = 'Everyone come and see how good I look!';
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
	
	InsuranceProfiling.controller('valuablesController', function($scope) {
		$scope.message = '';
		$scope.valuables = 
		[{
          name: 'Handbag',
          type: 'Gucci'
        },
        {
          name: 'Mobile phone',
          type: 'Android'
        }, 
        {
          name: 'Tablet',
          type: 'iPad'
        }];
	}); 