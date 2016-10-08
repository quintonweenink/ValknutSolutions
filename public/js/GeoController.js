
InsuranceProfiling.controller('geoController', function($scope, $http) {
	$scope.message = 'This is the Geo page (passed from controller as message )';

	google.charts.load('upcoming', {'packages':['geochart']});
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



});
