function getAge(dateString)
{
	var today = new Date();
	var birthDate = new Date(dateString);
	var age = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
	{
		age--;
	}
	return age;
}

InsuranceProfiling.controller('filterController',function($scope, $http)
{
	var totalMale = 0;
	var totalFemale = 0;
	var totalOther = 0;
	var Ages = [0,0];
	var cities = [];
	var maritalStatusses = [];
	var maritalCount = [];
	var cityCount = [];
	$http.get("/api/user")
	.then(function(response){

		var users = response.data;
		for (var i = 0; i < users.length; i++)
		{
			var user = users[i];
			//GENDER GRAPH
			if(user.gender == "male")
			{
				totalMale++;
			}
			if(user.gender == "female")
			{
				totalFemale++;
			}
			if(user.gender != "male" && user.gender != "female")
			{
				totalOther++;
			}
			//CITY GRAPh
			if(cities.indexOf(user.city) == -1)
			{
				cities.push(user.city);
				cityCount.push(1);
			}
			else
			{
				cityCount[cities.indexOf(user.city)]++;
			}
			//AGE GRAPH
			var Age = getAge(user.dateOfBirth);
			if(Age < 25 && Age >=18)
			{
				Ages[0]++;
			}
			else if(Age >=25)
			{
				Ages[1]++;
			}

			//Marital Status
			if(maritalStatusses.indexOf(user.marital_status.toUpperCase()) == -1)
			{
				maritalStatusses.push(user.marital_status.toUpperCase());
				maritalCount.push(1);
			}
			else
			{
				maritalCount[maritalStatusses.indexOf(user.marital_status.toUpperCase())]++;
			}

		}
	});

	$scope.message = "";
	$scope.data = [];
	$scope.labels = [];
	$scope.data.group1 = "Age";
	$scope.data.graphType = "Pie";

	$scope.submit = function(){
		$scope.message = "";
		if($scope.data.graphType == "Pie")
		{
		$scope.showPie = true;
		$scope.showBar = false;
		}
		else
		if($scope.data.graphType == "Bar")
		{
		$scope.showBar = true;
		$scope.showPie = false;
		}

		if($scope.data.group1=="Age")
		{
			$scope.labels = ["18-25",">25"];
			$scope.labels1 = ["18-25",">25"];
			$scope.data = Ages;
			$scope.data1 = Ages;
			$scope.options = {
				title: {
					display: true,
					text:  "Age"
				},
				legend: {
					display: true,
					labels: {
						fontColor: 'rgb(255, 99, 132)'
					}
				},
				scales: {
					yAxes: [{
						display: true,
						ticks: {
							suggestedMin: 0    // minimum will be 0, unless there is a lower value.
						}
					}]
				}
			};
			$scope.options1 = {
				title: {
					display: true,
					text:  "Age"
				},
				scales: {
					yAxes: [{
						display: true,
						ticks: {
							suggestedMin: 0    // minimum will be 0, unless there is a lower value.
						}
					}]
				}
			};
		}
		if($scope.data.group1=="Gender")
		{
			$scope.labels = ["Male","Female","Other"];
			$scope.labels1 = ["Male","Female","Other"];
			$scope.data = [totalMale,totalFemale,totalOther];
			$scope.data1 = [totalMale,totalFemale,totalOther];
			$scope.options = {
				title: {
					display: true,
					text:  "Gender"
				},
				legend: {
					display: true,
					labels: {
						fontColor: 'rgb(255, 99, 132)'
					}
				},
				scales: {
					yAxes: [{
						display: true,
						ticks: {
							suggestedMin: 0    // minimum will be 0, unless there is a lower value.
						}
					}]
				}
			};
			$scope.options1 = {
				title: {
					display: true,
					text:  "Gender"
				},
				scales: {
					yAxes: [{
						display: true,
						ticks: {
							suggestedMin: 0    // minimum will be 0, unless there is a lower value.
						}
					}]
				}
			};
		}

		if($scope.data.group1=="Location")
		{
			$scope.labels = cities;
			$scope.labels1 = cities;
			$scope.data = cityCount;
			$scope.data1= cityCount;
			$scope.options = {
				title: {
					display: true,
					text:  "Location"
				},
				legend: {
					display: true,
					labels: {
						fontColor: 'rgb(255, 99, 132)'
					}
				},
				scales: {
					yAxes: [{
						display: true,
						ticks: {
							suggestedMin: 0    // minimum will be 0, unless there is a lower value.
						}
					}]
				}
			};

			$scope.options1 = {
				title: {
					display: true,
					text:  "Location"
				},
				scales: {
					yAxes: [{
						display: true,
						ticks: {
							suggestedMin: 0    // minimum will be 0, unless there is a lower value.
						}
					}]
				}
			};
		}

		if($scope.data.group1=="Marital")
		{
			$scope.labels = maritalStatusses;
			$scope.labels1 = maritalStatusses;
			$scope.data = maritalCount;
			$scope.data1= maritalCount;
			$scope.options = {
				title: {
					display: true,
					text:  "Marital Status"
				},
				legend: {
					display: true,
					labels: {
						fontColor: 'rgb(255, 99, 132)'
					}
				},
				scales: {
					yAxes: [{
						display: true,
						ticks: {
							suggestedMin: 0    // minimum will be 0, unless there is a lower value.
						}
					}]
				}
			};

			$scope.options1 = {
				title: {
					display: true,
					text:  "Marital Status"
				},
				scales: {
					yAxes: [{
						display: true,
						ticks: {
							suggestedMin: 0    // minimum will be 0, unless there is a lower value.
						}
					}]
				}
			};
		}



	};

});
