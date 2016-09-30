InsuranceProfiling.controller('LiveGraphController',function($scope, $http, $mdToast,$mdDialog)
{

	$http.get("/api/graph/signups/")
	.then(function(response){
		$scope.data_line = [ response.data.data ];
		$scope.series_line = response.data.labels;
		$scope.labels_line = response.data.labels;
		$scope.options_line = response.data.options;
		$scope.datasetOverride_line = response.data.datasetOverride;
	});

	$http.get("/api/graph/SignupsPerDay/")
	.then(function(response2){
		$scope.data_day =  response2.data.data ;
		$scope.labels_day = response2.data.labels;
		$scope.options_day = response2.data.options;
	});


var socket = io().connect();
    socket.on('updateGraph', function() {
			$http.get("/api/graph/signups/")
			.then(function(response){
				updateChart(response);
			});

			$http.get("/api/graph/SignupsPerDay/")
			.then(function(response2){
				updateDayChart(response2);
			});

			$mdToast.show(
				 $mdToast.simple()
					 .textContent('New User added!')
					 .position('bottom right')
					 .hideDelay(2000)
			 );
	});

	$scope.onClickSlice = function (points, evt) {
		console.log(points[0])
						$mdDialog.show(
								$mdDialog.alert()
									.parent(angular.element(document.body))
									.clickOutsideToClose(true)
									.title('User signups for: ')
									.textContent(points[0]._model.label
									+' : '+ $scope.data_day[points[0]._index])
									.ok('Close')
							);
					};

	$scope.onClick_line = function (points, evt) {
										$mdDialog.show(
												$mdDialog.alert()
													.parent(angular.element(document.body))
													.clickOutsideToClose(true)
													.title('User signups for: ')
													.textContent($scope.labels_line[points[0]._index]
													+' : '+ $scope.data_line[0][points[0]._index])
													.ok('Close')
											);
									};

function updateChart(response)
{
	//console.log("Updating Chart ");
	$scope.data_line = [ response.data.data ];
	$scope.series_line = response.data.labels;
	$scope.labels_line = response.data.labels;
	$scope.$apply;
	$scope.$broadcast("$reload", {});
}

function updateDayChart(response2)
{
	//console.log("Updating Chart ");
	$scope.data_day =  response2.data.data ;
	$scope.labels_day = response2.data.labels;
	$scope.options_day = response2.data.options;
	$scope.$apply;
	$scope.$broadcast("$reload", {});
}


});
