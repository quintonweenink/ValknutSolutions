var assert = require('assert');

var fbMessengerController = require('../fbControllers/fbMessengerController');


describe('Facebook Messenger Test', function(){
    var activeUsers = {}
    var senderID = "SF93bsF576S"
    var user
    var intendedUser = {
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
            delete activeUsers.senderID
            var messageData = {
          	    recipient: {
          	      id: senderID
          	    },
          	    message: {
          	      text: ''
          	    }
        	};
            it("Returns the default message if the user is null", function(){
                  var message = "You will be contacted shortly...";

                  messageData.message.text = message;

                  let constructedMessage = fbMessengerController.getMessage(senderID, activeUsers.senderID);
                  assert.deepEqual(constructedMessage, messageData);
            });
      });


});
