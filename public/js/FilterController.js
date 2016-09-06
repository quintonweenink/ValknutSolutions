InsuranceProfiling.controller('filterController',function($scope, $http)
{
	$scope.submit = function(){
		$scope.message = "";
		if($scope.data.graphType == "pie")
		{
			$scope.showPie = true;
			$scope.showBar = false;
		}
		else
		if($scope.data.graphType == "bar")
		{
			$scope.showBar = true;
			$scope.showPie = false;
		}
		//This new method eliminates 5 if-else statements
		$http.get("/api/graph/"+$scope.data.group1+"/"+$scope.data.graphType)
		.then(function(response){
			$scope.data = response.data.data;
			$scope.labels = response.data.labels;
			$scope.options = response.data.options;
		});
	};

	$http.get("/api/graph/signups/")
	.then(function(response_2){
		// $scope.colors_line = [
    //   { // grey
    //     backgroundColor: 'rgba(148,159,177,0.2)',
    //     pointBackgroundColor: 'rgba(148,159,177,1)',
    //     pointHoverBackgroundColor: 'rgba(148,159,177,1)',
    //     borderColor: 'rgba(148,159,177,1)',
    //     pointBorderColor: '#fff',
    //     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    //   },
    //   { // dark grey
    //     backgroundColor: 'rgba(77,83,96,0.2)',
    //     pointBackgroundColor: 'rgba(77,83,96,1)',
    //     pointHoverBackgroundColor: 'rgba(77,83,96,1)',
    //     borderColor: 'rgba(77,83,96,1)',
    //     pointBorderColor: '#fff',
    //     pointHoverBorderColor: 'rgba(77,83,96,0.8)'
    //   }
    // ];
		$scope.data_line = response_2.data.data;
		$scope.series_line = response_2.data.labels;
		$scope.labels_line = response_2.data.labels;
		$scope.options_line = response_2.data.options;
		$scope.datasetOverride_line = response_2.data.datasetOverride;
	});


});
