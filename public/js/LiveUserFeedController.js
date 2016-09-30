InsuranceProfiling.controller('LiveUserFeedController', function($scope, $rootScope, $http) {

	$scope.cookie = getCookie();
	$scope.users;


	$http.get("/api/user?token="+$scope.cookie)
	.then(function(res){
		if (typeof res.data.success !== 'undefined') {
		    $scope.message = res.data.message
		}
		else{
			$scope.users = res.data;
			$scope.message = "Users recieved"
		}
	})

	var socket = io().connect();

    socket.on('new user', function (data) {
		console.log('New user added: ')
		console.log(data)
      	$scope.users.push(data)
		$scope.$apply()
  });

});
