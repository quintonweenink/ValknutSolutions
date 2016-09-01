function receivedMessage(messagingEvent)
{
	console.log(messagingEvent.message);
}

module.exports = function(app, passport){
	app.route('/messenger/webhook')
	.post(function(req, res) {
		var data = req.body;

		  // Make sure this is a page subscription
		  if (data.object == 'page') {
		    // Iterate over each entry
		    // There may be multiple if batched
		    data.entry.forEach(function(pageEntry) {
		      var pageID = pageEntry.id;
		      var timeOfEvent = pageEntry.time;

		      // Iterate over each messaging event
		      pageEntry.messaging.forEach(function(messagingEvent) {
		        if (messagingEvent.optin) {
		          receivedAuthentication(messagingEvent);
		        } else if (messagingEvent.message) {
		          receivedMessage(messagingEvent);
		        } else if (messagingEvent.delivery) {
		          receivedDeliveryConfirmation(messagingEvent);
		        } else if (messagingEvent.postback) {
		          receivedPostback(messagingEvent);
		        } else {
		          console.log("Webhook received unknown messagingEvent: ", messagingEvent);
		        }
		      });
	})
    .get(function(req, res) {
    	console.log("get");
		if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === 'this-is-a-shitty-token') {
		    console.log("Validating webhook");
		    res.status(200).send(req.query['hub.challenge']);
		} else {
		    console.error("Failed validation. Make sure the validation tokens match.");
		    res.sendStatus(403);          
  		}  
	});


};
