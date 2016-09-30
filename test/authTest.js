"use strict"
var assert = require('assert');

const authenticate = require('../controllers/auth/auth').authenticate
const generateToken = require('../controllers/auth/auth').generateToken
const messageList = require('../config/messageList')
const analyst = require('../config/objects/analyst')


describe('Authentication Test', function(){
    var intendedUser = analyst
    var req = {
        body: {

        },
        dataValues: analyst
    }
    var res = {
        status : 400,
        success : false,
        message : 'basic req',
        dataValues : '',
        json : function(data){
            this.dataValues = data
        }
    }
    var message
    describe('authenticate()', function(){
        it("Does not enter the bad zone if no token provided", function(){
            authenticate(req, res, function(){
                console.error("This test failed really badly");
                var error = {message : "Invalide token accepted: really bad"}
                throw err
            })

        });
        it("Does not enter the bad zone if bad token is provided", function(){
            req.body.token = 'notarealtoken'

            authenticate(req, res, function(){
                console.error("This test failed really badly");
                var error = {message : "Invalide token accepted: really bad"}
                throw err
            })

        });
        it("Does enter the bad zone if the correct token is provided", function(){
            req.body.token = generateToken(req).token
            authenticate(req, res, function(){
                //console.log("It should go in here");
            })

        });
    });
    describe('generateToken()', function(){
        it("If no user it returns bad request", function(){
            var noUser = undefined
            res = generateToken(noUser)
            assert.deepEqual(res.success, false)
            assert.deepEqual(res.message, 'Authentication failed. Analyst not found')
        });
        it("If user exists generate token", function(){
            res = generateToken(req)
            assert.deepEqual(res.success, true)
            assert(res.message)
        });
    });
});
