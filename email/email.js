var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var express = require('express');
var configAuth = require('../config/auth');

module.exports = {
  sendMail: function sendMail(_to,_subject,_text)
  {
    //setup smtp connection with config uri
    var transporter = nodemailer.createTransport(
        smtpTransport(configAuth.emailUri)
      );

  var mailOptions = {
      from: configAuth.emailFrom, // sender address from config emailFrom field
      to: _to, // list of receivers
      subject: _subject, // Subject line
      text: _text, // plaintext body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Email sent to: ' + _to +'\nSubject: '+_subject+'\nBody: '+_text);
  });

  }

};
