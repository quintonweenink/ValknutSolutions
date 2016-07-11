var FB = require('fb');

var auth = require('../config/auth.js');
module.exports = {
  //var fbApp = FB.extend({appId: auth.fb.appId, appSecret: auth.fb.appSecret});
  getLeadData : function getLeadData(leadgen_id, page_access_token)
  {
    //var FB.options({version: auth.fb.version});
    FB.api(
      '/' + leadgen_id,
      {access_token : page_access_token},
      function(res){
        if (!res || res.error)
        {
          console.log(!res ? 'error occured':res.error);
          return;
        }
        console.log('Lead body: ', util.inspect(res, {showHidden: false, depth: null}));
      }
    );
  }
};
