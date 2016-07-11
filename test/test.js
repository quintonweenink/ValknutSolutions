var userController = require("../DBControllers/UserController");
var request = require("supertest");
var assert = require('chai').assert;

var assert = require('assert');

describe('User test', function() {


  describe('Testing creatUser(User)', function() {
    it('should return exc', function(done) {

      request("https://insuranceprofiling.herokuapp.com")
	.post('/api/user')
	.send('')
    // end handles the response
	.end(function(err, res) {
          if (err) {
            console.log("error");
            throw err;
          }
          console.log(res.body);
          done();
        });
    });
  });

});
