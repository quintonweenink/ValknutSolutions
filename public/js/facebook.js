//------- FB Javascript SDK ------//
window.fbAsyncInit = function() {
  FB.init({
    appId      : '959936647438530',
    xfbml      : true,
    version    : 'v2.6'
  });

  $('#facebookLoading').hide(100);
  $('#facebookLoginButtonLeads').show(100);
  $('#loginInstructions').show(100);
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));
//------- FB Javascript SDK end ------//

function createLeadForm(userId, pageid)
{
  console.log("Creating lead form");
  FB.api(
    "/" + userId + "/adaccounts",
    function (response) {
      if (response && !response.error) {
        console.log(response.data[0].account_id);
        FB.ui({
          method: "lead_gen",
          page_id: pageid,
          ad_account_id : response.data[0].account_id,
          display: "popup"
        },
        function (res)
        {
          console.log(res);
        });
      }
    }
);

}

function termsOfService(page_id)
{
  FB.ui(
    {
      method: 'lead_gen_tos',
      page_id: page_id,
      display: 'popup'
    },
    function(response)
    {
      console.log(response);
    }
  );
}

function subscribeApp(page_id, page_access_token, page_name)
{
  termsOfService(page_id);
  console.log('Subscribing page to app!' + page_id);
  FB.api(
    '/' + page_id + '/subscribed_apps',
    'post',
    {access_token: page_access_token},
    function(res) {
    console.log('Subscribed to app', res);
    $('#pagesList').hide(100);
    sendPageAccessToken(page_id, page_access_token, page_name);
    console.log("After sending page access token");
  });
}

function sendPageAccessToken(page_id, page_access_token, page_name)
{
  console.log("Sending access token");
  var hostname = window.location.hostname;
  var protocol = window.location.protocol + "//";
  var port = (location.port ? ':' + location.port: '');
  var destination = "api/pageAccessToken";
  var address = protocol + hostname + port + "/api/pageAccessToken";
  $.post(address,
    {
        "page_id" : page_id,
        "page_access_token" : page_access_token,
        "page_name" : page_name
    }
    //accessTokenAdded(data,status)
  );
  //console.log(address);
}

function accessTokenAdded(data, status)
{
  console.log("Data: " + data + " Status: " + status);
}

function getPageImage(img, page_id)
{
  FB.api(
    '/' + page_id + '/picture',
    function(res){
      if (res && !res.error){
        img.attr('src', res.data.url);
      }
    }
  );
}

//------- FB login button ------//
 function facebookLoginLeads()
 {
   FB.login(function(res){
     var userId = res.authResponse.accessToken;
     console.log(userId);
     console.log('Successfully logged in', res);
     $('#facebookLoginButtonLeads').hide(100);
     FB.api('/me/accounts',function(response){
       console.log('Successfully retrieved pages', response);
       var pages = response.data;
       var ul = $('ul#pagesList');

       for (var i = 0; i < pages.length; i++)
       {
         var page = pages[i];
         var img = $('<img alt="' + page.name + '"></img>');
         getPageImage(img,page.id);
         var li = $('<li></li>');
         var div = $('<div class="chip"></div>');
         var a = $('<a></a>');

         a.herf = '#';
         a.on('click', subscribeApp.bind(this, page.id, page.access_token, page.name, userId));
         //a.on('click', createLeadForm.bind(this, res.authResponse.userID, page.id));
         //a.on('click', getCampaigns.bind(this, res.authResponse.userID));
         a.text(page.name);

         div.append(img);
         div.css({"cursor": "pointer"});
         div.append(a);
         li.append(div);
         ul.append(li);
       }
     })
   },{scope: ['manage_pages', 'ads_management']});
 }
//------- FB login button end ------//
