module.exports = {
addToUser : function addToUser(user, messageText)
{
	if(user === undefined || user === undefined){
		//Make an empty user
	  user = {
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
getMessage : function getMessage(recipientId, user) {

	var messageList = {
		8:'You will be contacted shortly...',
		0:'Please reply with your Name:',
		1:'Please reply with your Last name:',
		2:'Please reply with your Phone number:',
		3:'Please reply with your Marital status:',
		4:'Please reply with your Date of birth:',
		5:'Please reply with your Gender:',
		6:'Please reply with your City:',
		7:'Please reply with your Email:'
	};//Another hash table

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

  return messageData;
}


};
