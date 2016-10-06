InsuranceProfiling.controller('LeadController', function($scope, $http, $mdDialog) {
	$scope.message = "";
	$scope.user;

  if (navigator.geolocation)
		navigator.geolocation.getCurrentPosition(initiatePos, errorFunc)

	function initiatePos(pos)
	{
		var lat = pos.coords.latitude;
		var lng = pos.coords.longitude;
		setCity(lat, lng);s

	}

	function.errorFunc()
	{
			alert("geolocation failed");
	}

	function setCity(lat, lng)
	{
		var latlng = new google.maps.LatLng(lat, lng);
		geocoder.geocode({'latlng', function )(results, status{
			console.log(results);
			if (results[1])
			{
				alert (results[0].formatted_address);
				for (var i = 0; i < results[0].address_components.length; i++)
				{
					for (var b = 0; b < results[0].address_components[i].types.length; b++)
					{
						if (results[0].address_components[i].types[b] == "administrative_area_level_1")
						{
							city = results[0].address_components[i];
							console.log(city);
						}
					}
				}
			}
		})})
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
		if (navigator.geolocation)
		 navigator.geolocation.getCurrentPosition(successFunction)
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
