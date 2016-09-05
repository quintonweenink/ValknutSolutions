InsuranceProfiling.controller('leadController', function($scope) {
	$scope.message = "Lead page";

	$http.post
}).config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('blue')
      .dark();

  });

  function postUser()
  {
	  $http.post("/api/user")
  	.then(function(response){
		alert(response);
	}
  }
