var userController = require("../DBControllers/UserController");
var request = require("request");

function httpRequest(done)
{

    request('http://www.google.com', function (error, response, body, done) {
    if (!error && response.statusCode == 200) {
    console.log(body); // Show the HTML for the Google homepage.
    done(body);
    }
    else {
      console.log("error");
      done("error");
    }
    });
console.log("done"); // Show the HTML for the Google homepage.
}

function completed(comp)
{
    console.log(comp);
}

var assert = require('chai').assert;
describe('User test', function() {
  describe('Testing creatUser(User)', function() {
    it('should not insert due to no connection', function() {
      httpRequest(completed);
    });
  });

  describe('Testing creatUser(User)', function() {
    it('should return exc', function() {
      var newUser = {
				firstName: 'Unit',
				lastName: 'Test',
				contactNumber : '0121212',
				mobileNumber : '09312123',
				maritalStatus : 'Married',
				dateOfBirth : '1994/01/01 20:00',
				gender : 'male',
				location : 'Test',
				email : 'email@email.com'
		};
			var addedUser = userController.createUser(newUser);
      console.log("Exception: User not added due to no db connection")
    });
  });
});
