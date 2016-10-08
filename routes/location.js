"use strict"
var request = require('request');

module.exports = function(app, passport)
{
  app.route('/loc/location')
    .post(function(req, res)
    {
      console.log("=============Location=============");

      var lat = req.body.lat;
      var lng = req.body.lng;
      console.log("Lattitude: " + lat + " Longitude: :" + lng);

      request(
      {
        method : "GET",
        url : "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + ',' + lng +
        "&key=AIzaSyDQ45U7xOfDtZpgVjhIeIO8h280x9KBYP4"
      },
      function (error, response, body)
      {
        var data = JSON.parse(body);
        var loop = true;

        for (var obj in data.results)
				{
          if (!loop)
            break;
					var tmp = data.results[obj];
					for (var addr in tmp.address_components)
					{
            if (!loop)
              break;
						var tmp1 = tmp.address_components[addr];
						for (var type in tmp1.types)
            {
  						if (tmp.types[type] === 'administrative_area_level_2' ||
  						 	tmp.types[type + 1] === "political")
							{
								//$('#city').val(tmp1.long_name);
                console.log("City: " + tmp1.long_name);
                loop = false;
                break;
							}
            }
					}
				}

        console.log("=============Location end=============");
      });
      res.send("Location goes here");
    });
}
