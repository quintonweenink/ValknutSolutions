'use strict';

var InsuranceProfiling = angular.module('InsuranceProfiling', ['ngRoute','chart.js','ngMaterial']);

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

	// route for the login page
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
	.when('/filter',
	{
		templateUrl : 'views/pages/filter.html',
		controller : 'filterController'
	})
  .otherwise(
  {
    redirectTo: '/'
  });
	;
});
