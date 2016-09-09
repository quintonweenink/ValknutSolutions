InsuranceProfiling.controller('LiveUserFeedController', function($scope, $http) {
	$scope.message = "No message";
	$scope.users = [
		{'first_name': 'Quinton', 'last_name':'Weenink'},
		{'first_name': 'Margo', 'last_name':'Henning'}
	];


})
$(function(){
	var socket = io('http://localhost:3000');

    socket.on('new user', function (data) {
      $scope.users.push(data);
  });
})
