InsuranceProfiling.controller('LiveUserFeedController', function($scope, $rootScope, $http, $mdDialog) {

	$scope.cookie = getCookie();
	$scope.users;

	function makeProcessed() {
		$http.put("/api/user/"+$scope.currentUser.id)
		.then(function(response){
			$mdDialog.cancel()
			$scope.updateLiveFeed()
			$scope.openFromLeft(response.data.message)
		});
  	};


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

	$scope.processLead = function(user, ev) {
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
		$scope.currentUser = user;
		var parentEl = angular.element(document.body);
       $mdDialog.show({
         parent: parentEl,
         targetEvent: ev,
         template:
           '<md-dialog aria-label="List dialog">' +
           '  <md-dialog-content style="width: 450px">'+
		   '	<div class="container">'+
		   '	<div class="row">'+
		   '	<h5>Lead: </h5>'+
           '    <table>'+
           '      <tr><td>First Name: </td><td>'+user.first_name+'</td></tr>'+
		   '      <tr><td>Last Name: </td><td>'+user.last_name+'</td></tr>'+
		   '      <tr><td>Phone number: </td><td>'+user.phone_number+'</td></tr>'+
		   '      <tr><td>Marital status: </td><td>'+user.marital_status+'</td></tr>'+
		   '      <tr><td>Date of Birth: </td><td>'+user.date_of_birth+'</td></tr>'+
		   '      <tr><td>Gender: </td><td>'+user.gender+'</td></tr>'+
		   '      <tr><td>City: </td><td>'+user.city+'</td></tr>'+
		   '      <tr><td>Email: </td><td>'+user.email+'</td></tr>'+
		   '      <tr><td>Integration point: </td><td>'+user.from+'</td></tr>'+
		   '      <tr><td>Processed: </td><td>'+user.processed+'</td></tr>'+
           '     </table>'+
           '    </md-list-item></md-list>'+
		   '	</div>'+
		   '	</div>'+
           '  </md-dialog-content>' +
           '  <md-dialog-actions>' +
           '    <md-button ng-click="cancel()" class="md-primary">' +
           '      Cancel processing' +
           '    </md-button>' +
		   '    <md-button ng-click="process()" class="md-raised md-warn">' +
           '      Process' +
           '    </md-button>' +
           '  </md-dialog-actions>' +
           '</md-dialog>',
         locals: {
           items: $scope.items
         },
         controller: DialogController
	 })
  	};

	$scope.updateLiveFeed = function(){
		$http.get("/api/user?token="+$scope.cookie)
		.then(function(res){
				$scope.users = res.data.users
			    //$scope.message = res.data.message
				if(res.data.success)
					$scope.users = res.data.users
				else {
					$scope.openFromLeft(res.data.message)
					$location.path("/login");
				}
		})
	}

	$scope.updateLiveFeed()

	var socket = io().connect();

    socket.on('new user', function (data) {
		console.log('New user added: ')
		console.log(data)
      	$scope.users.push(data)
		$scope.$apply()
  });

  function DialogController($scope, $mdDialog) {
	  $scope.hide = function() {
		$mdDialog.hide();
	  };

	  $scope.cancel = function() {
		$mdDialog.cancel();
	  };

	  $scope.answer = function(answer) {
		$mdDialog.hide(answer);
	  };
  	$scope.process = makeProcessed;
}

});
