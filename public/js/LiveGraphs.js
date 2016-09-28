InsuranceProfiling.controller('LiveGraphController',function($scope, $http)
{
	var socket = io().connect();
	$http.get("/api/graph/signups/")
	.then(function(response){
		$scope.data_line = [ response.data.data ];
		$scope.series_line = response.data.labels;
		$scope.labels_line = response.data.labels;
		$scope.options_line = response.data.options;
		$scope.datasetOverride_line = response.data.datasetOverride;
	});

    socket.on('new user', function() {
			$http.get("/api/graph/signups/")
			.then(function(response){
				updateChart(response);
			});
	});

function updateChart(response)
{
	//$scope.$destroy();
	console.log("Updating Chart ");
	$scope.data_line = [ response.data.data ];
	$scope.message = response.data.data;
	$scope.series_line = response.data.labels;
	$scope.labels_line = response.data.labels;
	$scope.$apply;
	$scope.$broadcast("$reload", {});
}



});
