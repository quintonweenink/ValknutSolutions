InsuranceProfiling.controller('filterController',function($scope, $http)
{
	$scope.message = "";
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



});
