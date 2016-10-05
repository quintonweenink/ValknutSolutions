"use strict"
var assert = require('assert');

var fbMessengerController = require('../controllers/fb/messengerController');
const messageList = require('../config/messageList')
const emptyUser = require('../config/objects/user')
const userJSON = JSON.parse(JSON.stringify(emptyUser))

const objectValidate = require('../controllers/validation/fullValidation').objectValidate


describe('Validation Testing', function(){
    var activeUsers = {}
    var senderID = "SF93bsF576S"

    var intendedUser = emptyUser.clone(userJSON)
	intendedUser.messageId = 1

      var message
      describe('validate()', function(){
            it("Test of logic not really a unit test", function(){
				var messageText = 'hi'

				activeUsers[senderID] = emptyUser.clone(userJSON)
				activeUsers[senderID].messageId++;

                if(!messageList[activeUsers[senderID].messageId - 1].validate(messageText)){
					var error = {success: false, message: 'Should not go in here'}
                    throw error
                }
            });
			it("isName test with failing first_name", function(){
				var messageText = 'Yo420Blaz'

                if(messageList[intendedUser.messageId - 1].validate(messageText)){
					var error = {success: false, message: 'Should not go in here'}
                    throw error
                }
            });
			it("isName test with passing first_name", function(){
				var messageText = 'Quinton'

                if(!messageList[intendedUser.messageId - 1].validate(messageText)){
					var error = {success: false, message: 'Should not go in here'}
                    throw error
                }
				else {
					intendedUser.messageId++
				}
            });
			it("isName test with failing last_name", function(){
				var messageText = 'Yo420Blaz'

                if(messageList[intendedUser.messageId - 1].validate(messageText)){
					var error = {success: false, message: 'Should not go in here'}
                    throw error
                }
            });
			it("isName test with passing last_name", function(){
				var messageText = 'Weenink'

                if(!messageList[intendedUser.messageId - 1].validate(messageText)){
					var error = {success: false, message: 'Should not go in here'}
                    throw error
                }
				else {
					intendedUser.messageId++
				}
            });
			it("isPhoneNumber test with failing phone_number", function(){
				var messageText = '034445987'

                if(messageList[intendedUser.messageId - 1].validate(messageText)){
					var error = {success: false, message: 'Should not go in here'}
                    throw error
                }
            });
			it("isPhoneNumber test with passing phone_number", function(){
				var messageText = '0718906133'

                if(!messageList[intendedUser.messageId - 1].validate(messageText)){
					var error = {success: false, message: 'Should not go in here'}
                    throw error
                }
            });
			it("isPhoneNumber test with passing phone_number", function(){
				var messageText = '+27718906133'

                if(!messageList[intendedUser.messageId - 1].validate(messageText)){
					var error = {success: false, message: 'Should not go in here'}
                    throw error
                }
				else {
					intendedUser.messageId++
				}
            });
			it("isMarital test with passing marital_status", function(){
				var messageText = 'devorced'

                if(messageList[intendedUser.messageId - 1].validate(messageText)){
					var error = {success: false, message: 'Should not go in here'}
                    throw error
                }
            });
			it("isMarital test with passing marital_status", function(){
				var messageText = 'married'

                if(!messageList[intendedUser.messageId - 1].validate(messageText)){
					var error = {success: false, message: 'Should not go in here'}
                    throw error
                }
				else {
					intendedUser.messageId++
				}
            });
			it("isDate test with failing date_of_birth", function(){
				var messageText = '16-16-1994'

                if(messageList[intendedUser.messageId - 1].validate(messageText)){
					var error = {success: false, message: 'Should not go in here'}
                    throw error
                }
            });
			it("isDate test with passing date_of_birth", function(){
				var messageText = '04-11-1994'

                if(!messageList[intendedUser.messageId - 1].validate(messageText)){
					var error = {success: false, message: 'Should not go in here'}
                    throw error
                }
				else {
					intendedUser.messageId++
				}
            });
			it("isGender test with failing gender", function(){
				var messageText = 'catlin genner'

                if(messageList[intendedUser.messageId - 1].validate(messageText)){
					var error = {success: false, message: 'Should not go in here'}
                    throw error
                }
            });
			it("isGender test with passing gender", function(){
				var messageText = 'male'

                if(!messageList[intendedUser.messageId - 1].validate(messageText)){
					var error = {success: false, message: 'Should not go in here'}
                    throw error
                }
				else {
					intendedUser.messageId++
				}
            });
			it("isName test with failing City", function(){
				var messageText = 'catlin genner'

                if(messageList[intendedUser.messageId - 1].validate(messageText)){
					var error = {success: false, message: 'Should not go in here'}
                    throw error
                }
            });
			it("isName test with passing City", function(){
				var messageText = 'male'

                if(!messageList[intendedUser.messageId - 1].validate(messageText)){
					var error = {success: false, message: 'Should not go in here'}
                    throw error
                }
				else {
					intendedUser.messageId++
				}
            });
			it("isEmail test with failing email", function(){
				var messageText = 'dani@.com'

                if(messageList[intendedUser.messageId - 1].validate(messageText)){
					var error = {success: false, message: 'Should not go in here'}
                    throw error
                }
            });
			it("isEmail test with passing email", function(){
				var messageText = 'quinton@gmail.com'

                if(!messageList[intendedUser.messageId - 1].validate(messageText)){
					var error = {success: false, message: 'Should not go in here'}
                    throw error
                }
				else {
					intendedUser.messageId++
				}
            });
      });
	  describe('objectValidate()', function(){
		  var passingUser = emptyUser.clone(userJSON)

            it("Validate passing user", function(){

			  passingUser.first_name = 'Quinton'
			  passingUser.last_name = 'Weenink'
			  passingUser.phone_number = '0718596641'
			  passingUser.marital_status = 'married'
			  passingUser.date_of_birth = '2-2-1994'
			  passingUser.gender = 'female'
			  passingUser.city = 'PE'
			  passingUser.email = 'quinton@gmail.com'


                if(!objectValidate(passingUser).success){
					var error = {success: false, message: 'Should not go in here'}
                    throw error
                }
            });
			it("Test of logic not really a unit test", function(){
				passingUser.email = '420blazzzz'

				if(objectValidate(passingUser).success){
					var error = {success: false, message: 'Should not go in here'}
                    throw error
                }
            });
		});

});
