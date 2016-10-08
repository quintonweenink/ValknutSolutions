InsuranceProfiling.controller('filterController',function($scope, $http, $mdDialog)
{
	$scope.message = "";
	$scope.submit = function(){
		$scope.message = "";
		if($scope.graphType == "pie")
		{
			$scope.showPie = true;
			$scope.showBar = false;
		}
		else
		if($scope.graphType == "bar")
		{
			$scope.showBar = true;
			$scope.showPie = false;
		}
		//This new method eliminates 5 if-else statements
		$http.get("/api/graph/"+$scope.group1+"/"+$scope.graphType)
		.then(function(response){
			if(response.data.data.length == 0)
			{
				$scope.message = "No users in db";
			}
			else
			{
				$scope.data = response.data.data;
				$scope.labels = response.data.labels;
				$scope.options = response.data.options;
			}
		});
	};



	$scope.onClick = function (points, evt) {
						$mdDialog.show(
								$mdDialog.alert()
									.parent(angular.element(document.body))
									.clickOutsideToClose(true)
									.title('Data for : '+$scope.options.title.text)
									.textContent(points[0]._model.label
									+' : '+ $scope.data[points[0]._index])
									.ok('Close')
							);
					};




});
