var FB = require('fb');
var leadController = require("../db/LeadController");
var userController = require("../db/UserController");
var email = require("../../controllers/email/email");

var auth = require('../../config/auth.js');


module.exports = {
  //https://graph.facebook.com/oauth/access_token?client_id=959936647438530&client_secret=a1b4088df1dc99305fee1fa09c2c6e61&grant_type=fb_exchange_token&fb_exchange_token=EAANpDqrgoMIBABpEIRPct1YPpnIBwxS0GTQuVdWhUajE2asfOJv2egdaXDm9fGS7kkAkbLtyerMZCP3uluqUdkKhYmmUnrYsXxqfuwl9YsB6ZBa0xGYepCmBA1e0Y8HZBCl1ZB2ltLTBCiz8YwwHG5PmVz8FvLghUrh5rmBeCwZDZD
  extendAccessToken : function extendAccessToken(page_access_token, callback)
  {
    FB.api(
      'oauth/access_token',
      {
        client_id : auth.fb.appId,
        client_secret : auth.fb.appSecret,
        grant_type : 'fb_exchange_token',
        fb_exchange_token : page_access_token
      },
      function (res){
        callback(res);
      }
    );
  },
  userAddedCallback : function userAddedCallback(user)
  {
    //Any functions to perform after the lead was captured from facebook and successfully added to the database
    email.sendMail(user.email, "Valknut Testing", "You have completed one of our Facebook lead ads");
  },
  extractUser : function extractUser(lead)
  {
    var user = {
      first_name : "",
      last_name : "",
      phone_number : "",
      marital_status : "",
      date_of_birth : "",
      gender : "",
      city : "",
      email : ""
    }
    for (i = 0; i < lead.length; i++)
    {
      user[lead[i].name] = lead[i].values[0];
    }

    console.log("\n\nextraction of user done\n\n");
    return user;
  },
  facebookLeadCallback : function facebookLeadCallback(res, value, adId, callback, extractUserCallback){
      if (!res || res.error)
      {
        console.log(!res ? 'error occured':res.error);
        return;
      }
      var user = extractUserCallback(res.field_data);
      userController.createUser(user, function(userId){
        leadController.createLead({
          lead_id : '' + value.leadgen_id + '',
          ad_id : adId,
          user_id : userId
        });
        callback(user);
      });

      return res;
  },
  getLeadData : function getLeadData(value, page_access_token, adId, callback, completeCallback, extractUserCallback)
  {
    //var FB.options({version: auth.fb.version});
    FB.api(
      '/' + value.leadgen_id,
      {access_token : page_access_token},
      function(res){
        callback(res, value, adId, completeCallback, extractUserCallback);
      }
    );
  }
};
