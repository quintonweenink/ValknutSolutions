var request = require("supertest");
var assert = require('chai').assert;

var assert = require('assert');

var env = process.env.NODE_ENV || "development";
var url;

if (env != "development")
{
  url = "https://insuranceprofiling.herokuapp.com";
}
else {
  url = "localhost:3000";
}

describe("Testing API", function() {
  //Local testing variables
  var path;

  path = "/api/user/";
  describe("URL: " + url + path, function() {
    //Local testing variables
    var currentUser;

    describe('POST : /api/user/', function() {
      it('should insert and return the inserted user', function(done) {
        	//POST request
        request(url)
      	.post(path)
      	.send('')
      	.end(function(err, res) {
                if (err) {
                  console.log("error");
                  throw err;
                }
                currentUser = res.body;
                done();
        });
      });
    });

    describe("GET : /api/user/:currentUser", function() {
      it('should get user with id', function(done) {
        	//DELETE request
        request(url)
      	.get(path + currentUser.id)
      	.send('')
      	.end(function(err, res) {
                if (err) {
                  console.log("error");
                  throw err;
                }
                assert.equal(res.body.id, currentUser.id);
                done();
        });
      });
    });

    describe('DELETE : /api/user/:currentUser', function() {
      it('should delete the just inserted user', function(done) {
        	//DELETE request
        request(url)
      	.delete('/api/user/' + currentUser.id)
      	.send('')
      	.end(function(err, res) {
                if (err) {
                  console.log("error");
                  throw err;
                }
                assert.equal(res.body.ID, currentUser.id);
                done();
        });
      });
    });


  });
});
