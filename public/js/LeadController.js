InsuranceProfiling.controller('LeadController', function($scope, $http) {
	$scope.message = "";
	$scope.user;
	$scope.postForm = function()
	{
		$http({
	    method: 'POST',
	    url: '/api/user',
	    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	    data:
		'first_name='+$scope.user.first_name+
		'&last_name='+$scope.user.last_name+
		'&phone_number='+$scope.user.phone_number+
		'&marital_status='+$scope.user.marital_status+
		'&date_of_birth='+$scope.user.date_of_birth+
		'&gender='+$scope.user.gender+
		'&city='+$scope.user.city+
		'&email='+$scope.user.email
		}).then(function(res){
			    $scope.message = res.data.message
		})
	}

})/*.config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('blue')
      .dark();

  });*/
