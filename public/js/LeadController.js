InsuranceProfiling.controller('LeadController', function($scope, $http, $mdDialog) {
	$scope.message = "";
	$scope.user = {}

	$scope.user.from = "Website"

  if (navigator.geolocation)
		navigator.geolocation.getCurrentPosition(initiatePos, errorFunc)

	function initiatePos(pos)
	{
		var lat = pos.coords.latitude;
		var lng = pos.coords.longitude;
		setCity(lat, lng);

	}

	function errorFunc()
	{
			alert("geolocation failed");
	}

	function setCity(lat, lng)
	{
		alert("Lat: " + lat + " Lon: " + lng);
		$http({
			method : 'GET',
			url : 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng +
			"&key=AIzaSyCufQbkKm7hySeotd6q3lZ3n0Yumb4Gv-o"
		}).then(function (res)
			{
				console.log("Respones form maps: ", res);
				for (var obj in res.data.results)
				{
					alert(obj.types[0]);
					for (var type in obj.types)
						if (type === 'street_address')
							alert(type);
				}
			});
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
