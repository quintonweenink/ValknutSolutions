var nodemailer = require('nodemailer');
var express = require('express');
var configAuth = require('../config/auth');

module.exports = {
emailer : function createUser(newUser)
{
  var transporter = nodemailer.createTransport("SMTP", {
          service: 'webmail',
          auth: {
              user: configAuth.emailAuth.user,
              pass: configAuth.emailAuth.pass
          }
      });
var mailOptions = {
    from: '"Lel" <Test@test.com>', // sender address
    to: 'test@test.com', // list of receivers
    subject: 'Hello', // Subject line
    text: 'Hello world', // plaintext body
    html: '<b>Hello world</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Email sent:');



});

}
};
