InsuranceProfiling.controller('geoController', function($scope, $http) {

	$scope.cookie = getCookie();

	$scope.updateLiveFeed = function(){
		$http.get("/api/user?token="+$scope.cookie)
		.then(function(res){
				if(!res.data.success) {
					$location.path("/login")
				}
		})
	}

	$scope.updateLiveFeed()


	$scope.message = 'This is the Geo page (passed from controller as message )';
	var key = 'AIzaSyDQ45U7xOfDtZpgVjhIeIO8h280x9KBYP4';
	// var key = 'AIzaSyC8QmyT2CZbJUh3YTyQrb2Kcl-yc0nqMBM';
	google.charts.load('upcoming', {'packages':['geochart'], mapsApiKey: key });
	google.charts.setOnLoadCallback(drawRegionsMap);

	function drawRegionsMap() {
		$http.get("/api/graph/Geochart/")
		.then(function(response){
			// var data = google.visualization.arrayToDataTable([
			// 	['City',   'Users'],
			// 	['Pretoria', 20],
			// 	['PE', 30],
			// 	['Eastern Cape', 40],
			// 	['Northen Cape',50],
			// 	['North West', 60],
			// 	['KwaZulu-Natal', 70],
			// 	['Free State',80]
			// ]);
			var data = google.visualization.arrayToDataTable(response.data.data);

			var options = response.data.options;

			var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

			chart.draw(data, options);
		});
	}
	//
	// google.charts.load('upcoming', {'packages':['geochart']});
	google.charts.setOnLoadCallback(drawAfrica);

	function drawAfrica() {
		$http.get("/api/graph/GeoChartCountry/")
		.then(function(response2){

			var data2 = google.visualization.arrayToDataTable(response2.data.data);

			var options2 = response2.data.options;

			var chart2 = new google.visualization.GeoChart(document.getElementById('africa_div'));

			chart2.draw(data2, options2);
		});
	}


	});
