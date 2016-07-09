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

function subscribeApp(page_id, page_access_token){
  console.log('Subscribing page to app!' + page_id)
}

//------- FB login button ------//
 function myFacebookButton()
 {
   FB.login(function(res){
     console.log('Successfully logged in', res);
     FB.api('/me/accounts',function(response){
       console.log('Successfully retrieved pages', response);
       var pages = response.data;
       var ul = document.getElementById('list');

       for (var i = 0; i < pages.length; i++)
       {
         var page = pages[i];
         var li = document.createElement('li');
         var a = document.createElement('a');
         a.herf = '#';
         a.onclick = subscribeApp.bind(this, page.id, page.access_token);
         a.innerHTML = page.name
         li.appendChild(a);
         ul.appendChild(li);
       }
     })
   },{scope: 'manage_pages'});
 }
//------- FB login button end ------//
