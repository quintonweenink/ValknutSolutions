var env = process.env.NODE_ENV || "development";
var authObj = {
      'fb': {
           'appId': '959936647438530',
           'appSecret': 'a1b4088df1dc99305fee1fa09c2c6e61',
           'callbackURL': 'localhost',
           'version': 'v2.6'
      },
      'emailAuth': {
          'user': 'valknutsolutions7@gmail.com',
          'pass': 'BleepBlop'
      },
      'messenger': {
          'access_token': 'EAAZAXI4LkwOMBANlZBEysu0I1jAgOqRe7H9u0ZB58G92yfOXibZBvBZA4fZAVKoAhnZBvWawekuhrGl3ksaNudYqc5NuFzyECBW2Y8W1iXkthlX5b7oZBviZBuWDjEJgNeQFwjKtSb1HMZAZArUWBntKLF0a2EQ7q9JcUBjKM3j9CN33QZDZD',
          'verify_token':'this-is-a-shitty-token'
      },
      'weChat': {
          'encodingAESKey': 'kOLctQbMhlo5hHVBLDK1FSbSsG53tDfAZHBZrP8tTtl',
          'token':'thisisashittytoken7'
      },
      'googleMaps' : {
          'apiKey' : 'AIzaSyDVXBav7-jWp5fD4zRRB75VVU7RX4k1Y8E'
      },
      'secret': 'secretsecretsecretbro',
      'emailUri' : 'smtps://valknutsolutions7:BleepBlop@smtp.gmail.com',
      'emailFrom' : 'Test@servername.com',
      'url': 'https://marketlead.herokuapp.com/'
}


if (env != "development"){
  var pg = require('pg');
  pg.defaults.ssl = true;
  authObj = process.env.AUTH
}

module.exports = authObj
