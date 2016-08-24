var assert = require('assert');
var fbController = require('../fbControllers/fbController');

describe('Facebook Controller', function(){
  describe('extractUserTest', function(){
    var testData = {
        "created_time": "2000-01-01T00:00:00+0000",
        "id": "00000000000000",
        "field_data": [
          {
            "name": "first_name",
            "values": [
              "Test Name"
            ]
          },
          {
            "name": "last_name",
            "values": [
              "Test Surname"
            ]
          },
          {
            "name": "email",
            "values": [
              "test@test.com"
            ]
          },
          {
            "name": "city",
            "values": [
              "Test City"
            ]
          },
          {
            "name": "date_of_birth",
            "values": [
              "01/01/2000"
            ]
          },
          {
            "name": "gender",
            "values": [
              "male"
            ]
          },
          {
            "name": "marital_status",
            "values": [
              "null"
            ]
          },
          {
            "name": "phone_number",
            "values": [
              "+00000000000"
            ]
          }
        ]
        };
    var finalData = {
      "first_name" : "Test Name",
      "last_name" : "Test Surname",
      "phone_number" : "+00000000000",
      "marital_status" : "null",
      "date_of_birth" : "01/01/2000",
      "gender" : "male",
      "city" : "Test City",
      "email" : "test@test.com"
    };
    it("should return json object of a user that can be added to the database", function(){
      assert.equal(finalData, fbController.extractUser(testData));
    });
  });
});
