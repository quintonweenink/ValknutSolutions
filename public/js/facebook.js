//------- FB Javascript SDK ------//
window.fbAsyncInit = function() {
  FB.init({
    appId      : '959936647438530',
    xfbml      : true,
    version    : 'v2.6'
  });
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));
//------- FB Javascript SDK end ------//

function subscribeApp(page_id, page_access_token, page_name){
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
  $.post("localhost/api/pageAccessToken",
    {
        "page_id" : page_id,
        "page_access_token" : page_access_token,
        "page_name" : page_name
    },
    accessTokenAdded(data,status)
  );
  console.log()
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
         a.on('click', subscribeApp.bind(this, page.id, page.access_token, page.name));
         a.text(page.name);



         div.append(img);
         div.css({"cursor": "pointer"});
         div.append(a);
         li.append(div);
         ul.append(li);
       }
     })
   },{scope: 'manage_pages'});
 }
//------- FB login button end ------//
