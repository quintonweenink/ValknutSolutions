
var request = require('request');

var config = require('../config/auth');

var models = require("../models");
var userController = require("../controllers/db/UserController");

var fbMessengerController = require("../controllers/fb/fbMessengerController")

var activeUsers = {};//Hash table

var util = require('util')


module.exports = function(app, passport){
	app.route('/weChatBot/webhook')
	.post(function(req, res) {
        console.log('===============message=============')

        console.log(req.body.xml)

        var tousername = req.body.xml.tousername[0]
        var fromusername = req.body.xml.fromusername[0]
        var msgtype = req.body.xml.msgtype[0]
        var content = req.body.xml.content[0]
        var createtime = parseInt(req.body.xml.createtime[0])


        res.contentType("application/xml")
        var reply = "Hi there from valknut solutions";

        var str = util.format("<xml>"+
        "<ToUserName>%s</ToUserName>"+
        "<FromUserName>%s</FromUserName>"+
        "<CreateTime>%d</CreateTime>"+
        "<MsgType>text</MsgType>"+
        "<Content><![CDATA[%s]]></Content>"+
        "</xml>",
        fromusername, tousername, createtime+1, reply)

        console.log(str)

        res.send(str)
	})
    .get(function(req, res) {
    	console.log(req.query)
        var echostr = req.param('echostr', null)
        res.send(echostr)
	});


};
