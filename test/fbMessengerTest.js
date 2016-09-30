"use strict"
var assert = require('assert');

var fbMessengerController = require('../controllers/fb/fbMessengerController');
const messageList = require('../config/messageList')
const emptyUser = require('../config/objects/user')


describe('Facebook Messenger Test', function(){
    var activeUsers = {}
    var senderID = "SF93bsF576S"
    var intendedUser = emptyUser
      var message
      describe('addToUser()', function(){
            it("Returns a valid empty user", function(){
                message = 'Hi'

                activeUsers.senderID = fbMessengerController.addToUser(activeUsers.senderID, message)

                assert.deepEqual(activeUsers.senderID, intendedUser);
            });
            it("Places the first name in the user", function(){
                message = 'Quinton'

                intendedUser.first_name = message;
                intendedUser.messageId++;

                activeUsers.senderID = fbMessengerController.addToUser(activeUsers.senderID, message)

                assert.deepEqual(activeUsers.senderID, intendedUser);
            });
            it("Places the last name in the user", function(){
                message = 'Weenink'

                intendedUser.last_name = message;
                intendedUser.messageId++;

                activeUsers.senderID = fbMessengerController.addToUser(activeUsers.senderID, message)
                assert.deepEqual(activeUsers.senderID, intendedUser);
            });
            it("Places the phone number in the user", function(){
                message = '071 555 9858'

                intendedUser.phone_number = message;
                intendedUser.messageId++;

                activeUsers.senderID = fbMessengerController.addToUser(activeUsers.senderID, message)
                assert.deepEqual(activeUsers.senderID, intendedUser);
            });
            it("Places the marital status in the user", function(){
                message = 'Married'

                intendedUser.marital_status = message;
                intendedUser.messageId++;

                activeUsers.senderID = fbMessengerController.addToUser(activeUsers.senderID, message)
                assert.deepEqual(activeUsers.senderID, intendedUser);
            });
            it("Places the date of birth in the user", function(){
                message = '08/03/1995'

                intendedUser.date_of_birth = message;
                intendedUser.messageId++;

                activeUsers.senderID = fbMessengerController.addToUser(activeUsers.senderID, message)
                assert.deepEqual(activeUsers.senderID, intendedUser);
            });
            it("Places the gender in the user", function(){
                message = 'male'

                intendedUser.gender = message;
                intendedUser.messageId++;

                activeUsers.senderID = fbMessengerController.addToUser(activeUsers.senderID, message)
                assert.deepEqual(activeUsers.senderID, intendedUser);
            });
            it("Places the city in the user", function(){
                message = 'Cape Town'

                intendedUser.city = message;
                intendedUser.messageId++;

                activeUsers.senderID = fbMessengerController.addToUser(activeUsers.senderID, message)
                assert.deepEqual(activeUsers.senderID, intendedUser);
            });
            it("Places the email in the user", function(){
                message = 'fake@gmail.com'

                intendedUser.email = message;
                intendedUser.messageId++;

                activeUsers.senderID = fbMessengerController.addToUser(activeUsers.senderID, message)
                assert.deepEqual(activeUsers.senderID, intendedUser);
            });
      });
      describe('getMessage()', function(){
            var messageData = {
          	    recipient: {
          	      id: senderID
          	    },
          	    message: {
          	      text: ''
          	    }
        	};
            intendedUser = emptyUser

            it("Returns the default message if the user is null", function(){
                  var message = messageList[8]

                  messageData.message.text = message
                  delete activeUsers.senderID

                  let constructedMessage = fbMessengerController.getMessage(senderID, activeUsers.senderID)

                  assert.deepEqual(constructedMessage, messageData)
            });
            it("Constructs name message", function(){
                  var message = messageList[0];

                  messageData.message.text = message;
                  intendedUser.messageId = 0;

                  let constructedMessage = fbMessengerController.getMessage(senderID, intendedUser);

                  assert.deepEqual(constructedMessage, messageData);
            });
            it("Constructs last name message", function(){
                  var message = messageList[1];

                  messageData.message.text = message;
                  intendedUser.messageId = 1;

                  let constructedMessage = fbMessengerController.getMessage(senderID, intendedUser);

                  assert.deepEqual(constructedMessage, messageData);
            });
            it("Constructs phone message", function(){
                  var message = messageList[2];

                  messageData.message.text = message;
                  intendedUser.messageId = 2;

                  let constructedMessage = fbMessengerController.getMessage(senderID, intendedUser);

                  assert.deepEqual(constructedMessage, messageData);
            });
            it("Constructs marital message", function(){
                  var message = messageList[3];

                  messageData.message.text = message;
                  intendedUser.messageId = 3;

                  let constructedMessage = fbMessengerController.getMessage(senderID, intendedUser);

                  assert.deepEqual(constructedMessage, messageData);
            });
            it("Constructs date of birth message", function(){
                  var message = messageList[4];

                  messageData.message.text = message;
                  intendedUser.messageId = 4;

                  let constructedMessage = fbMessengerController.getMessage(senderID, intendedUser);

                  assert.deepEqual(constructedMessage, messageData);
            });
            it("Constructs gender message", function(){
                  var message = messageList[5];

                  messageData.message.text = message;
                  intendedUser.messageId = 5;

                  let constructedMessage = fbMessengerController.getMessage(senderID, intendedUser);

                  assert.deepEqual(constructedMessage, messageData);
            });
            it("Constructs city message", function(){
                  var message = messageList[6];

                  messageData.message.text = message;
                  intendedUser.messageId = 6;

                  let constructedMessage = fbMessengerController.getMessage(senderID, intendedUser);

                  assert.deepEqual(constructedMessage, messageData);
            });
            it("Constructs email message", function(){
                  var message = messageList[7];

                  messageData.message.text = message;
                  intendedUser.messageId = 7;

                  let constructedMessage = fbMessengerController.getMessage(senderID, intendedUser);

                  assert.deepEqual(constructedMessage, messageData);
            });
      });


});
