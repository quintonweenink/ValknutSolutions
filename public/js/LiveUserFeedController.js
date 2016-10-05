InsuranceProfiling.controller('LiveUserFeedController', function($scope, $rootScope, $http, $mdDialog) {

	$scope.cookie = getCookie();
	$scope.users;

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

	$http.get("/api/user?token="+$scope.cookie)
	.then(function(res){
			$scope.users = res.data
		    $scope.message = res.data.message
			$scope.openFromLeft(res.data.message)
	})

	var socket = io().connect();

    socket.on('new user', function (data) {
		console.log('New user added: ')
		console.log(data)
      	$scope.users.push(data)
		$scope.$apply()
  });

});
