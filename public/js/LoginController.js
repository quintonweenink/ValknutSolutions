InsuranceProfiling.controller('loginController', function($scope, $http, $mdDialog, $location) {
	$scope.cookie = getCookie()
	$scope.message = "";

	$scope.openFromLeft = function(message) {
    	$mdDialog.show(
      		$mdDialog.alert()
        	.clickOutsideToClose(true)
        	.title('Alert')
        	.htmlContent(message)
        	.ariaLabel(message)
        	.ok('Ok!')
        	// You can specify either sting with query selector
        	.openFrom('#left')
        	// or an element
        	.closeTo(angular.element(document.querySelector('#right')))
    		);
  	};

	//not the best test
	$http.get("/api/user?token="+$scope.cookie)
	.then(function(res){
		if(res.success)
			$scope.openFromLeft('You already have a token')
	});

	$scope.analystLogin
	$scope.analystSignup
	$scope.adminLogin
	$scope.adminSignup

	$scope.postAnalystLogin = function()
	{
		$http({
	    method: 'POST',
	    url: '/api/analyst/authenticate',
	    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	    data:
		'email='+$scope.analystLogin.email+
		'&password='+$scope.analystLogin.password
		}).success(function (res) {
			if(res.success){
				setCookie(res.token)
				$scope.openFromLeft("You have successfully logged in! <i class='material-icons'>check_circle</i>")
				$location.path("/liveUserFeed")
			}
			else
			{
				setCookie('notvalidtoken')
				$scope.openFromLeft("Incorrect email or password! <i class='material-icons'>clear</i>")
			}
		})
	}
	$scope.postAnalystSignup = function()
	{
		$http({
	    method: 'POST',
	    url: '/api/analyst',
	    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	    data:
		'email='+$scope.analystSignup.email+
		'&password='+$scope.analystSignup.password
		}).success(function (res) {
			if(res.success){
				setCookie(res.token)
				$scope.openFromLeft("You are signed up!  <i class='material-icons'>check_circle</i>")
			}
			else
			{
				$scope.openFromLeft("There was a problem signing up <i class='material-icons'>clear</i>")
			}
			//window.location = '/';
		})
	}
	$scope.postAdminLogin = function()
	{
		$http({
	    method: 'POST',
	    url: '/api/admin',
	    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	    data:
		'email='+$scope.adminLogin.email+
		'&password='+$scope.adminLogin.password
		}).success(function (res) {
			$scope.message = res.message
			if(res.success){
				setCookie(res.token)
				$scope.openFromLeft("You are logged in")
			}
		})
	}
	$scope.postAdminSignup = function()
	{
		$http({
	    method: 'POST',
	    url: '/api/admin/authenticate',
	    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	    data:
		'email='+$scope.adminSignup.email+
		'&password='+$scope.adminSignup.password
		}).success(function (res) {
			if(res.success){
				setCookie(res.token)
				$scope.openFromLeft("You are signed up")
			}
			//window.location = '/';
		})
	}
}).config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('blue')
      .dark();

  });
