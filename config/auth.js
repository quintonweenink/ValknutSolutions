var env = process.env.NODE_ENV || "development";
var authObj = {
      "fb": {
           "appId": "hidden",
           "appSecret": "hidden",
           "callbackURL": "localhost",
           "version": "v2.6"
      },
	  "secret":"fakesecret",
      "url": "https://marketlead.herokuapp.com/"
}

console.log("Node env: " + process.env.NODE_ENV)

if (env != "development"){
  var pg = require('pg');
  pg.defaults.ssl = true;
  authObj = JSON.parse(process.env.AUTH || authObj)
}

module.exports = authObj
