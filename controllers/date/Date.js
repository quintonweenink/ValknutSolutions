module.exports = {
getAge : function getAge(dateString)
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
},
getMonths : function getMonths(dateString)
{
		var monthNames = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];
	var birthDate = new Date(dateString);
	var month = birthDate.getMonth()
	return monthNames[month];
},
getDay : function getDay(dateString)
{
		var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
		"Saturday"];
	var birthDate = new Date(dateString);
	var day = birthDate.getDay()
	return days[day];
}


};
