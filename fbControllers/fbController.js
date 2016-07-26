var FB = require('fb');
var leadController = require("../DBControllers/LeadController");

var auth = require('../config/auth.js');

function extractUser(lead)
{
  console.log("ExtractedLead: " + JSON.stringify(lead[0].name));
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
    console.log("Setting " + lead[i].name + " to " + lead[i].values[0]);
    user[lead[i].name] = lead[i].values[0];
  }
  console.log("ExtractedUser : " + JSON.stringify(user));
  return user;
}

module.exports = {
  //var fbApp = FB.extend({appId: auth.fb.appId, appSecret: auth.fb.appSecret});
  getLeadData : function getLeadData(value, page_access_token)
  {
    //var FB.options({version: auth.fb.version});
    FB.api(
      '/' + value.leadgen_id,
      {access_token : page_access_token},
      function(res){
        if (!res || res.error)
        {
          console.log(!res ? 'error occured':res.error);
          return;
        }
        var user = extractUser(res.field_data);

        return res;
      }
    );
  }
};
