var FB = require('fb');
var leadController = require("../DBControllers/LeadController");

var auth = require('../config/auth.js');
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
        console.log('Lead body: ', JSON.stringify(res));
        var lead = res.body;
        var newLead = {
          lead_id : '' + lead.id,
          ad_id : value.ad_id,
          lead_data : lead
        }
        leadController.createLead(newLead);

        return res;
      }
    );
  }
};
