InsuranceProfiling.controller('loginFormController', function($scope, $rootScope, $http) {
	$scope.cookie = getCookie()

	$http.get("/api/user?token="+$rootScope.token)
	.then(function(users){
		$scope.message = 'You already have a token'
	});

	console.log($scope.message)
	$scope.analyst;
	$scope.postForm = function()
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
});
