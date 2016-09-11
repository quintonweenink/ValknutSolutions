InsuranceProfiling.controller('LiveUserFeedController', function($scope, $http) {
	$scope.message = "No message";
	$scope.users = [
		{'first_name': 'Quinton', 'last_name':'Weenink'},
		{'first_name': 'Margo', 'last_name':'Henning'}
	];

	var socket = io('http://localhost:3000');

    socket.on('new user', function (data) {
		console.log('New user added: ')
		console.log(data)
      	$scope.users.push(data)
		$scope.$apply() 
  });

});
