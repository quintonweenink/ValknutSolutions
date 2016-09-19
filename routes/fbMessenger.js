var request = require('request');

var config = require('../config/auth');

var models = require("../models");
var userController = require("../DBControllers/UserController");

var activeUsers = {};//Hash table
var messageList = {
	8:'Your will be contacted shortly',
	0:'Please reply with your Name:',
	1:'Please reply with your Last name:',
	2:'Please reply with your Phone number:',
	3:'Please reply with your Marital status:',
	4:'Please reply with your Date of birth:',
	5:'Please reply with your Gender:',
	6:'Please reply with your City:',
	7:'Please reply with your Email:'
};//Another hash table

var user = {
   messageId : 0,
   first_name : '',
   last_name : '',
   phone_number : '',
   marital_status : '',
   date_of_birth : '',
   gender : '',
   city : '',
   email : ''
 }

// var senderID = 'asdfasdfsadf';
// var messageText = 'This is entered';
//
//  for(var x = 0; x < 10; x++)
//  {
// 	 saveMessage(senderID, messageText)
// 	 console.log(activeUsers.senderID);
//  }



function sendTextMessage(recipientId, user, messageText) {
	var messageNumber;
	if(user === undefined)
		messageNumber = 8;
	else {
		messageNumber = user.messageId;
	}
	  var messageData = {
	    recipient: {
	      id: recipientId
	    },
	    message: {
	      text: messageList[messageNumber]
	    }
  	};

  console.log('Trying to send this message back to facebook: '+ messageData)

  callSendAPI(messageData);
}

function receivedDeliveryConfirmation(event)
{
	  var senderID = event.sender.id;
	  var recipientID = event.recipient.id;
	  var timeOfMessage = event.timestamp;
	  var message = event.message;

	  console.log("Successfully sent message for user %d and page %d at %d with message:",
	    senderID, recipientID, timeOfMessage);
	  console.log(JSON.stringify(message));
}

function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: config.messenger.access_token },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s",
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      //console.error(response);
      console.error(error.message);
    }
  });
}

function saveMessage(senderID, messageText)
{
	if(activeUsers.senderID === undefined || activeUsers.senderID.messageId === undefined){
	  activeUsers.senderID = {
	     messageId : 0,
	     first_name : '',
	     last_name : '',
	     phone_number : '',
	     marital_status : '',
	     date_of_birth : '',
	     gender : '',
	     city : '',
	     email : ''
	 	};
	}
	else
	{
	   activeUsers.senderID.messageId++;
	   console.log(activeUsers.senderID.messageId);
	   switch (activeUsers.senderID.messageId)
	   {
		   case 1:
			   activeUsers.senderID.first_name = messageText;
			   break;
		   case 2:
			   activeUsers.senderID.last_name = messageText;
			   break;
		   case 3:
			   activeUsers.senderID.phone_number = messageText;
			   break;
		   case 4:
			   activeUsers.senderID.marital_status = messageText;
			   break;
		   case 5:
			   activeUsers.senderID.date_of_birth = messageText;
			   break;
		   case 6:
			   activeUsers.senderID.gender = messageText;
			   break;
		   case 7:
			   activeUsers.senderID.city = messageText;
			   break;
		   default:
			   activeUsers.senderID.email = messageText;
			   console.log(activeUsers.senderID);
			   userController.createUser(activeUsers.senderID);
			   delete activeUsers.senderID;
			   break;
	   }
	}
}

function receivedMessage(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  console.log("Received message for user %d and page %d at %d with message:",
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  var messageId = message.mid;

  // You may get a text or attachment but not both
  var messageText = message.text;
  var messageAttachments = message.attachments;

  console.log('Sender Id: '+senderID);


  if (messageText && message.is_echo === undefined){

	 saveMessage(senderID, messageText);
    // If we receive a text message, check to see if it matches any special
    // keywords and send back the corresponding example. Otherwise, just echo
    // the text we received.
    switch (messageText) {
      // case 'image':
      //   sendImageMessage(senderID);
      //   break;

      // case 'button':
      //   sendButtonMessage(senderID);
      //   break;

      // case 'generic':
      //   sendGenericMessage(senderID);
      //   break;

      // case 'receipt':
      //   sendReceiptMessage(senderID);
      //   break;

      default:
        sendTextMessage(senderID, activeUsers.senderID, messageText);
    }
  } else if (messageAttachments) {
    //sendTextMessage(senderID, "Message with attachment received");
  }
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
		     });
		     res.sendStatus(200);
  		}
	})
    .get(function(req, res) {
    	console.log("get");
		if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === config.messenger.verify_token) {
		    console.log("Validating webhook");
		    res.status(200).send(req.query['hub.challenge']);
		} else {
		    console.error("Failed validation. Make sure the validation tokens match.");
		    res.sendStatus(403);
  		}
	});


};
