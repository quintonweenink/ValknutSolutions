InsuranceProfiling.controller('LiveUserFeedController', function($scope, $http) {
	$scope.message = "No message";
	$scope.users;

    var socket = io('http://localhost');

    socket.on('new user', function (data) {
      $scope.users.push(data);
    });

})
