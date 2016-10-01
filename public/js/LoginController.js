InsuranceProfiling.controller('loginController', function($scope, $http) {
	$scope.cookie = getCookie()

	$http.get("/api/user?token="+$scope.cookie)
	.then(function(users){
		$scope.message = 'You already have a token'
	});

	console.log($scope.message)
	$scope.analyst;

	$scope.postAnalystLogin = function()
	{
		$http({
	    method: 'POST',
	    url: '/api/analyst/authenticate',
	    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	    data:
		'email='+$scope.analyst.email+
		'&password='+$scope.analyst.password
		}).success(function (res) {
			$scope.message = res.message
			if(res.success){
				setCookie(res.token)
				console.log(res.token)
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
		'email='+$scope.analyst.email+
		'&password='+$scope.analyst.password
		}).success(function (res) {
			$scope.message = res.message
			if(res.success){
				setCookie(res.token)
				console.log(res.token)
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
		'email='+$scope.analyst.email+
		'&password='+$scope.analyst.password
		}).success(function (res) {
			$scope.message = res.message
			if(res.success){
				setCookie(res.token)
				console.log(res.token)
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
		'email='+$scope.analyst.email+
		'&password='+$scope.analyst.password
		}).success(function (res) {
			$scope.message = res.message
			if(res.success){
				setCookie(res.token)
				console.log(res.token)
			}
			//window.location = '/';
		})
	}
});
