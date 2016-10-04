"use strict"
var request = require('request');

var config = require('../config/auth');

var models = require("../models");
var userController = require("../controllers/db/UserController");

var fbMessengerController = require("../controllers/fb/fbMessengerController")

var activeUsers = {};//Hash table

var util = require('util')

const messageList = require('../config/messageList')


module.exports = function(app, passport){
	app.route('/weChatBot/webhook')
	.post(function(req, res) {
        console.log('===============message=============')

        console.log(req.body.xml)

        var tousername = req.body.xml.tousername[0]
        var senderID = req.body.xml.fromusername[0]
        var msgtype = req.body.xml.msgtype[0]
        var content = req.body.xml.content[0]
        var createtime = parseInt(req.body.xml.createtime[0])

        activeUsers[senderID] = fbMessengerController.addToUser(activeUsers[senderID], content)

		//validate here, not the best way but i need to check the messageID
		if(!messageList[activeUsers[senderID].messageId-1].validate(messageText)){
			activeUsers[senderID].messageId--
			activeUsers[senderID].email = ''
		}

        if(activeUsers[senderID].email != ''){
            userController.createUser(activeUsers[senderID])
            delete activeUsers[senderID]
        }


        let str = fbMessengerController.getXMLMessage(senderID, tousername, createtime, activeUsers[senderID])

        console.log(str)

		res.contentType("application/xml")

        res.send(str)
	})
    .get(function(req, res) {
    	console.log(req.query)
        var echostr = req.param('echostr', null)
        res.send(echostr)
	});


};
