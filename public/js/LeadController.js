InsuranceProfiling.controller('LeadController', function($scope, $http, $mdDialog) {
	$scope.message = ""
	$scope.user = {}

	$scope.selections = {}

	$scope.selections.gender = [
        "male",
        "female"
    ]

	$scope.selections.marital_status = [
        "married",
        "single"
    ]

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
		$http({
			method : 'POST',
			url : '/loc/location',
			headers :
				{
					'Content-Type' : 'application/x-www-form-urlencoded'
				},
			data :
				"lat=" + lat +
				"&lng=" + lng
		}).then(function (res)
			{
				$scope.user.city = res.data
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
		'&phone_number='+encodeURIComponent($scope.user.phone_number)+
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

})
