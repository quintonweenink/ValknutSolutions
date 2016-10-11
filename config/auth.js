var env = process.env.NODE_ENV || "development";
var authObj = {
      "fb": {
           "appId": "hidden",
           "appSecret": "hidden",
           "callbackURL": "localhost",
           "version": "v2.6"
      },
	     "secret":"fakesecret",
       "url": "https://marketlead.herokuapp.com/",
       "google" :
       {
          "maps" : "AIzaSyDQ45U7xOfDtZpgVjhIeIO8h280x9KBYP4"
       }
}

if(env == "testing"){
	//This is for Travis
}
else if (env != "development"){
  var pg = require('pg');
  pg.defaults.ssl = true;
  authObj = JSON.parse(process.env.AUTH || authObj)
}

module.exports = authObj
