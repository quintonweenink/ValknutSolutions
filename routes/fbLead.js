var models = require('../models');
var fbControllers = require('../controllers/fb/fbController');
var advertisementCotroller = require("../controllers/db/AdvertisementController");
var pageController = require('../controllers/db/PageController');
var userController = require('../controllers/db/UserController');
var fs = require('fs');

module.exports = function(app, passport)
{
  /*
    Extends the access token before saving it to the database
    to ensure that the leads can be retrieved for the longest amount of time
  */
  function accessTokenCallback(req, res, pageAccessToken)
  {
    //Setting up the page to be saved to the database
  	var page = {
  		page_id : req.body.page_id,
  		page_name : req.body.page_name,
  		page_access_token : pageAccessToken
  	};

    //Creating the page
  	var newPage = pageController.createPage(page)
  	.then(function(pages)
    {
  		res.status(200).json(pages);
    })
    //Function to execute when there was an error with extending the access token
    .catch(function(error)
    {
  		 console.log("The following error occured: " + error);
  		 res.status(500).json({ error: 'error' });
    });

  	console.log('Page created', JSON.stringify(newPage));
  	res.status(200);
  }

  /*
    Route for extending the access token and saving it to the database
  */
  app.route('/api/pageAccessToken')
	.post(function(req,res)
  {
		fbControllers.extendAccessToken(req.body.page_access_token, function (token)
    {
			accessTokenCallback(req, res, token.access_token);
		});
	});

  /*
    When the page is found it will create the advertisement in the db with
    all of the necessary information related to an advertisement
  */
  function leadPageFound(page, value)
  {
    //Setting up the data to save to the database
  	var advertisement =
    {
  		page_id: page.id,
  		advertisement_id: '' + value.ad_id + ''
  	};

    //Creating the new advertisement
  	var newAdvertisement = advertisementCotroller.createAdvertisement(advertisement, function(id)
    {
  		fbControllers.getLeadData(value, page.pageAccessToken, id, fbControllers.facebookLeadCallback, fbControllers.userAddedCallback, fbControllers.extractUser);
  	});
  }

  function processLead(lead)
  {
    //Traversing the lead object structure
  	for (var ent in lead)
  	{
  		var changes = lead[ent].changes;
  		for (var ch in changes)
  		{
  			var value = changes[ch].value;

        //Retrive the page that is related to this lead in order to get the
        //access token in order to get the data from facebook and save it to
        //the database
  			models.Page.findOne(
        {
  				where: {pageID : '' + value.page_id + ''}
  			})
  			.then(function(page)
        {
  					leadPageFound(page, value);
  			});
  		}
  	}
  }

  /*
    Recieves the lead from facebook
  */
  app.route('/api/leads')
  	.post(function(req, res)
    {
  		processLead(req.body.entry);
    
      //Facebook requires this response in order to stop pinging our
      //server with the new lead
      console.log(req.body);
  		res.send('{"success" : true}');
  	})
  	.get(function(req, res)
    {
  		//Function to verify that this server is the one that needs to talk to Facebook
  		//was only used once
  		if (req.query['hub.verify_token'] == 'bleepBlop123')
  			res.send(req.query['hub.challenge']);
  		else
      {
        //For debugging purposes to retrieve a lead and see what it looks like
        //because facebook only allows leads to be sent to live https server
  			fs.readFile('./lead.json', function(err, data)
        {
  				if (err) throw err;
  				res.send(data);
  			});
  		}
  	});
}
