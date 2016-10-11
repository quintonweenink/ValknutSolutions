InsuranceProfiling.controller('LiveGraphController',function($scope, $http, $mdToast,$mdDialog)
{
	$scope.message = "";
	$http.get("/api/graph/SignupsPerMonth/line")
	.then(function(response){
		if(response.data.data.length == 0)
		{
			$scope.message = "No users in db";
		}
		else
		{
			//$scope.colors_line = ['#72C02C', '#3498DB', '#717984', '#F1C40F'];
			$scope.data_line = [ response.data.data ];
			$scope.series_line = response.data.labels;
			$scope.labels_line = response.data.labels;
			$scope.options_line = response.data.options;
			$scope.datasetOverride_line = response.data.datasetOverride;
		}
	});

	$http.get("/api/graph/SignupsPerDay/pie")
	.then(function(response2){
		if(response2.data.data.length == 0)
		{
			$scope.message = "No users in db";
		}
		else
		{
		//	$scope.colors_day = ['#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'];
			$scope.data_day =  response2.data.data ;
			$scope.labels_day = response2.data.labels;
			$scope.options_day = response2.data.options;
		}
	});

	$http.get("/api/graph/FromWhere/bar")
	.then(function(response3){
		if(response3.data.data.length == 0)
		{
			$scope.message = "No users in db";
		}
		else
		{
		//	$scope.colors_from = ['#72C02C', '#3498DB', '#717984', '#F1C40F'];
			$scope.data_from = response3.data.data;
			$scope.labels_from = response3.data.labels;
			$scope.options_from = response3.data.options;
		 }
	});


	$http.get("/api/graph/ProcessedCount")
	.then(function(response4){
		if(response4.data.data.length == 0)
		{
			$scope.message = "No users in db";
		}
		else
		{
		//	$scope.colors_proc = ['#72C02C', '#3498DB', '#717984', '#F1C40F'];
			$scope.data_proc =  response4.data.data ;
			$scope.labels_proc = response4.data.labels;
			$scope.options_proc = response4.data.options;
		}
	});

	var socket = io().connect();
	socket.on('updateGraph', function() {
		$http.get("/api/graph/SignupsPerMonth/line")
		.then(function(response){
				updateChart(response);
		});

		$http.get("/api/graph/SignupsPerDay/pie")
		.then(function(response2){
				updateDayChart(response2);
		});

		$http.get("/api/graph/FromWhere/bar")
		.then(function(response3){
				updateFromChart(response3);
		});

		$http.get("/api/graph/ProcessedCount")
		.then(function(response4){
			updateProcChart(response4);
	});

		$mdToast.show(
			$mdToast.simple()
			.textContent('New User added!')
			.position('bottom right')
			.hideDelay(2000)
		);

		$scope.$apply;
		$scope.$broadcast("$reload", {});
	});

	$scope.onClickSlice = function (points, evt) {
		$mdDialog.show(
			$mdDialog.alert()
			.parent(angular.element(document.body))
			.clickOutsideToClose(true)
			.title($scope.options_day.title.text)
			.textContent(points[0]._model.label
				+' : '+ $scope.data_day[points[0]._index])
				.ok('Close')
			);
		};

		$scope.onClickProcessed = function (points, evt) {
			$mdDialog.show(
				$mdDialog.alert()
				.parent(angular.element(document.body))
				.clickOutsideToClose(true)
				.title($scope.options_proc.title.text)
				.textContent(points[0]._model.label
					+' : '+ $scope.data_proc[points[0]._index])
					.ok('Close')
				);
			};

		$scope.onClick_line = function (points, evt) {
			$mdDialog.show(
				$mdDialog.alert()
				.parent(angular.element(document.body))
				.clickOutsideToClose(true)
				.title($scope.options_line.title.text)
				.textContent($scope.labels_line[points[0]._index]
					+' : '+ $scope.data_line[0][points[0]._index])
					.ok('Close')
				);
			};

			$scope.onClick_from = function (points, evt) {
				$mdDialog.show(
					$mdDialog.alert()
					.parent(angular.element(document.body))
					.clickOutsideToClose(true)
					.title($scope.options_from.title.text)
					.textContent($scope.labels_from[points[0]._index]
						+' : '+ $scope.data_from[points[0]._index])
						.ok('Close')
					);
				};


			function updateChart(response)
			{
				//console.log("Updating Chart ");
				$scope.data_line = [ response.data.data ];
				$scope.series_line = response.data.labels;
				$scope.labels_line = response.data.labels;
				// $scope.$apply;
				// $scope.$broadcast("$reload", {});
			}

			function updateDayChart(response2)
			{
				//console.log("Updating Chart ");
				$scope.data_day =  response2.data.data ;
				$scope.labels_day = response2.data.labels;
				$scope.options_day = response2.data.options;
				// $scope.$apply;
				// $scope.$broadcast("$reload", {});
			}

			function updateFromChart(response3)
			{
				$scope.data_from = response3.data.data;
				$scope.labels_from = response3.data.labels;
				$scope.options_from = response3.data.options;
			};

			function updateProcChart(response4)
			{
				$scope.data_proc = response4.data.data;
				$scope.labels_proc = response4.data.labels;
				$scope.options_proc = response4.data.options;
			};

		});
