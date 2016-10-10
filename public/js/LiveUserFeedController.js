InsuranceProfiling.controller('LiveUserFeedController', function($scope, $http, $mdDialog, $location) {

	$scope.cookie = getCookie();
	$scope.users = {}
	$scope.filters = {}
	$scope.filters.showProcessed = false
	$scope.user = {}
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
  	}

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
				//$scope.$apply()
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

	$scope.customLead = function(user, ev) {
		$scope.user = user
		var parentEl = angular.element(document.body);
       $mdDialog.show({
         parent: parentEl,
         targetEvent: ev,
         templateUrl:'views/pages/processLead.tmpl.html',
         locals: {
           user: user,
		   calcAge : $scope.calcAge
         },
		 clickOutsideToClose:true,
         controller: DialogController,
		 fullscreen: true // Only for -xs, -sm breakpoints.
	 })
  	};



	$scope.updateLiveFeed()

	$scope.filterUsers = function filterUsers(users, filters) {
		var filteredUsers = []
		if(users != null)
			for(var x = 0; x < users.length; x++){
				if(users[x].processed == filters.showProcessed)
					filteredUsers.push(users[x])
			}
		return filteredUsers

	}

	$scope.changeShowProcessed = function changeShowProcessed() {
		$scope.filters.showProcessed = !$scope.filters.showProcessed
		//$scope.$apply()
	}

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

	  $scope.calcAge = function(dateString) {
		  var birthday = +new Date(dateString);
		  return ~~((Date.now() - birthday) / (31557600000));
	};

		$scope.drawMap = function drawMap(user){
			console.log("Drawing the map")
			console.log(user)
			var key = 'AIzaSyDQ45U7xOfDtZpgVjhIeIO8h280x9KBYP4'
			google.charts.load('upcoming', {'packages':['geochart'], mapsApiKey: key })
			google.charts.setOnLoadCallback(function() {
				var cities = [];
				var cityCount = [];
					if(cities.indexOf(user.city.toUpperCase()) == -1)
					{
						cities.push(user.city.toUpperCase());
						cityCount.push(1);
					}
					else
					{
						cityCount[cities.indexOf(user.city.toUpperCase())]++;
					}

				var arr2 = new Array();
				arr2[0] = new Array(2);
				arr2[0][0] = 'City';
				arr2[0][1] = 'Users';
					for (var i=0; i < cities.length;i++)
					{
						arr2[i+1] = new Array(2);
						arr2[i+1][0] = cities[i];
						arr2[i+1][1] = cityCount[i];
					}
				var GraphObject = new Object;

				GraphObject.data = arr2;
				GraphObject.options =
				{
					region: 'ZA',
					legend : {textStyle: {color: 'blue', fontSize: 16}},
					// resolution : 'provinces',
					backgroundColor: '#86c5da',
					datalessRegionColor : '#FEE8D6',
					// height : 600,
					// keepAspectRatio : true,
					displayMode: 'markers',
					markerOpacity : 0.7,
					sizeAxis : { maxSize: 15, minSize: 5},
					colorAxis: {colors: ['red','green', 'blue']}
				}


					var data = google.visualization.arrayToDataTable(GraphObject.data);

					var options = GraphObject.options;

					var chart = new google.visualization.GeoChart(document.getElementById('regions_div')[0])

					chart.draw(data, options);
			})
		}



  	$scope.process = makeProcessed;
}

});
