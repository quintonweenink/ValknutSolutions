var FB = require('fb');
var leadController = require("../DBControllers/LeadController");
var userController = require("../DBControllers/UserController");
var email = require("../email/email")

var auth = require('../config/auth.js');

module.exports = {
  extractUser : function extractUser(lead)
  {
    var user = {
      "first_name" : "",
      "last_name" : "",
      "phone_number" : "",
      "marital_status" : "",
      "date_of_birth" : "",
      "gender" : "",
      "city" : "",
      "email" : ""
    }
    for (i = 0; i < lead.length; i++)
    {
      user[lead[i].name] = lead[i].values[0];
    }
    return user;
  },
  facebookLeadCallback : function facebookLeadCallback(res, value, adId){
      if (!res || res.error)
      {
        console.log(!res ? 'error occured':res.error);
        return;
      }
      var user = this.extractUser(res.field_data);
      userController.createUser(user, function(userId){
        leadController.createLead({
          lead_id : '' + value.leadgen_id + '',
          ad_id : adId,
          user_id : userId
        });
        console.log(user.email);
        email.sendMail(user.email, "Valknut Testing",
          "You have completed one of our Facebook lead ads");
      });

      return res;
  },
  getLeadData : function getLeadData(value, page_access_token, adId)
  {
    //var FB.options({version: auth.fb.version});
    FB.api(
      '/' + value.leadgen_id,
      {access_token : page_access_token},
      function(res){
        return facebookLeadCallback(res, value, adId);
      }
    );
  }
};
