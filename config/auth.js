var env = process.env.NODE_ENV || "development";
var authObj = {
      "fb": {
           "appId": "hidden",
           "appSecret": "hidden",
           "callbackURL": "localhost",
           "version": "v2.6"
      },
      "url": "https://marketlead.herokuapp.com/"
}


if (env != "development"){
  var pg = require('pg');
  pg.defaults.ssl = true;
  authObj = JSON.parse(process.env.AUTH)
}

module.exports = authObj
