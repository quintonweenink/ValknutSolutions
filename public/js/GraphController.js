
InsuranceProfiling.controller('graphController', function($scope) {
	$scope.message = 'This is the Graph page (passed from controller as message )';
});


InsuranceProfiling.controller('SelectedTextController', function($scope) {
	$scope.items = ["Location", "Age"];
	$scope.selectedItem;
	$scope.getSelectedText = function() {
		if ($scope.selectedItem !== undefined) {
			return "You have selected:" + $scope.selectedItem;
		} else {
			return "Please select a filter";
		}
	};
});

InsuranceProfiling.controller("PieCtrl",
function ($scope) {
	$scope.labels = ["Age", "Time"];
	$scope.data = [20, 100];
});

InsuranceProfiling.controller("BubbleCtrl",
function ($scope) {
	$scope.series = ['Lelelelele A', 'Series B'];

	$scope.data = [
		[{
			x: 25,
			y: 24,
			r: 50
		}],
		[{
			x: 23,
			y: 20,
			r: 50
		}]
	];
});



InsuranceProfiling.controller("LineCtrl",
function ($scope) {
	$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
	$scope.series = ['Series A', 'Series B'];
	$scope.data = [
		[65, 59, 80, 81, 56, 55, 40],
		[28, 48, 40, 19, 86, 27, 90]
	];
	$scope.onClick = function (points, evt) {
		console.log(points, evt);
	};
	$scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
	$scope.options = {
		scales: {
			yAxes: [
				{
					id: 'y-axis-1',
					type: 'linear',
					display: true,
					position: 'left'
				},
				{
					id: 'y-axis-2',
					type: 'linear',
					display: true,
					position: 'right'
				}
			]
		}
	};
});
