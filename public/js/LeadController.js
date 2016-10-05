InsuranceProfiling.controller('LeadController', function($scope, $http, $mdDialog) {
	$scope.message = "";
	$scope.user

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

	$scope.postForm = function()
	{
		var leadReq = {
	    method: 'POST',
	    url: '/api/user',
	    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	    data:
		'first_name='+$scope.user.first_name+
		'&last_name='+$scope.user.last_name+
		'&phone_number='+encodeURIComponent($scope.user.phone_number)+
		'&marital_status='+$scope.user.marital_status+
		'&date_of_birth='+$scope.user.date_of_birth+
		'&gender='+$scope.user.gender+
		'&city='+$scope.user.city+
		'&email='+$scope.user.email
		}

		console.log(leadReq)

		$http(leadReq).then(function(res){
			    //$scope.message = res.data.message
				$scope.openFromLeft(res.data.message)
		})
	}

})/*.config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('blue')
      .dark();

  });*/
