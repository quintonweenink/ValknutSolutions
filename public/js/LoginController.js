InsuranceProfiling.controller('loginController', function($scope, $http, $mdDialog) {
	$scope.cookie = getCookie()

	$scope.openFromLeft = function(message) {
    	$mdDialog.show(
      		$mdDialog.alert()
        	.clickOutsideToClose(true)
        	.title('Alert')
        	.textContent(message)
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
			$scope.message = res.message
			if(res.success){
				setCookie(res.token)
				$scope.openFromLeft("You are logged in")
			}
			//window.location = '/';
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
				$scope.openFromLeft("You are signed up")
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
			//window.location = '/';
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
});
