InsuranceProfiling.controller('LiveUserFeedController', function($scope, $http) {

	$scope.message = '';

	$http.get("/api/user")
	.then(function(users){
		$scope.users = users.data;
	});

	var socket = io().connect();

    socket.on('new user', function (data) {
		console.log('New user added: ')
		console.log(data)
      	$scope.users.push(data)
		$scope.$apply()
  });

});
