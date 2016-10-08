InsuranceProfiling.controller('LiveUserFeedController', function($scope, $rootScope, $http, $mdDialog, $location) {

	$scope.cookie = getCookie();
	$scope.users;
	$scope.user
	$scope.message = "";

	function calcAge(dateString) {
		var birthday = +new Date(dateString);
  		return ~~((Date.now() - birthday) / (31557600000));
}

	$scope.calcAge = calcAge

	function makeProcessed() {
		$http.put("/api/user/"+$scope.user.id)
		.then(function(response){
			$mdDialog.cancel()
			$scope.updateLiveFeed()
			$scope.openFromLeft(response.data.message)
		});
  	};

	$scope.updateLiveFeed = function(){
		$http.get("/api/user?token="+$scope.cookie)
		.then(function(res){
				$scope.users = res.data.users
				//$scope.message = res.data.message
					$scope.users = res.data.users
				if(!res.data.success) {
					$scope.openFromLeft(res.data.message)
					$location.path("/login")
				}
		})
	}


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

	$scope.processLead = function(user, ev, updateLiveFeed, openFromLeft) {
		$scope.currentUser = user;
			$mdDialog.show(
				$mdDialog.confirm()
	        	.clickOutsideToClose(true)
	        	.title('Lead')
	        	.textContent("<div>"+user+"</div>")
	        	.ariaLabel(user)
	        	.ok('I have processed this lead')
				.cancel('Not processing this lead')
	        	// You can specify either sting with query selector
	        	.openFrom('#left')
	        	// or an element
	        	.closeTo(angular.element(document.querySelector('#right')))
			)
  	};

	$scope.customLead = function(user, ev) {
		$scope.user = user
		var parentEl = angular.element(document.body);
       $mdDialog.show({
         parent: parentEl,
         targetEvent: ev,
         templateUrl:'views/pages/processLead.tmpl.html',
         locals: {
           user: user
         },
		 clickOutsideToClose:true,
         controller: DialogController,
		 fullscreen: true // Only for -xs, -sm breakpoints.
	 })
  	};



	$scope.updateLiveFeed()

	var socket = io().connect();

    socket.on('new user', function (data) {
		console.log('New user added: ')
		console.log(data)
      	$scope.users.push(data)
		$scope.$apply()
  });

  function DialogController($scope, $mdDialog, user) {
	  $scope.user = user
	  $scope.hide = function() {
		$mdDialog.hide();
	  };

	  $scope.cancel = function() {
		$mdDialog.cancel();
	  };

	  $scope.answer = function(answer) {
		$mdDialog.hide(answer);
	  };

	  $scope.process = function(){
		  $http.put("/api/user/"+$scope.user.id)
  		.then(function(response){
  			$scope.cancel()
			$http.get("/api/user?token="+$scope.cookie)
			.then(function(res){
					$scope.users = res.data.users
					//$scope.message = res.data.message
						$scope.users = res.data.users
					if(!res.data.success) {
						$scope.openFromLeft(res.data.message)
						$location.path("/login")
					}
			})
			$mdDialog.show(
	      		$mdDialog.alert()
	        	.clickOutsideToClose(true)
	        	.title('Alert')
	        	.textContent(response.data.message)
	        	.ariaLabel(response.data.message)
	        	.ok('Ok!')
	        	// You can specify either sting with query selector
	        	.openFrom('#left')
	        	// or an element
	        	.closeTo(angular.element(document.querySelector('#right')))
	    		);
  		});
	  }

  	$scope.process = makeProcessed;
}

});
