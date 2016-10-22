"use strict"
const messageList = require('../../config/messageList')
const emptyUser = require('../../config/objects/user')
const userJSON = JSON.parse(JSON.stringify(emptyUser))
const xmlMessage = require('../../config/xmlMessage').messageFormat

const formatErrorMessage = "There was a problem with your reply format, please try again. "

var util = require('util')

module.exports = {
	addToUser : function addToUser(user, messageText)
	{
		if(user === undefined || user === undefined){
			//Make an empty user
			user = emptyUser.clone(userJSON)
		}
		else
		{
			user.messageId++;
			switch (user.messageId)
			{
				case 1:
				user.first_name = messageText;
				break;
				case 2:
				user.last_name = messageText;
				break;
				case 3:
				user.phone_number = messageText;
				break;
				case 4:
				user.marital_status = messageText;
				break;
				case 5:
				user.date_of_birth = messageText;
				break;
				case 6:
				user.gender = messageText;
				break;
				case 7:
				user.city = messageText;
				break;
				default:
				user.email = messageText;
				break;
			}
		}
		return user;
	},
	getMessage : function getMessage(recipientId, user, isValid) {

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
				text: messageList[messageNumber].message
			}
		};

		if(!isValid)
			messageData.message.text = formatErrorMessage + messageData.message.text

		return messageData;
	},
	getXMLMessage : function getXMLMessage(recipientId, fromusername, createtime, user) {

		var messageNumber;
		if(user === undefined)
		messageNumber = 8;
		else {
			messageNumber = user.messageId;
		}
		var str = util.format(xmlMessage, recipientId, fromusername, createtime+1, messageList[messageNumber].message)

		return str;
	}

};
