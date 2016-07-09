var userController = require("../DBControllers/UserController");

var assert = require('chai').assert;
describe('User test', function() {
  describe('Testing creatUser(User)', function() {
    it('should not insert due to no connection', function() {
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

  describe('Testing creatUser(User)', function() {
    it('should return exception', function() {
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
