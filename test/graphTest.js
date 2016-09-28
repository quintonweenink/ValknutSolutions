var assert = require('assert');

var dateController = require('../controllers/date/Date.js');


describe('Graph Date Test', function(){
  describe('getAge()', function(){
    it("Returns a valid age from a datestring", function(){
      var testData = "1994-06-05T22:00:00.000Z";
      assert(dateController.getAge(testData));
    });
    it("Returns the age 22 from a datestring 1994-06-05T22:00:00.000Z", function(){
      var testData = "1994-06-05T22:00:00.000Z";
      var testAge = 22;
      assert.equal(testAge, dateController.getAge(testData));
    });
    it("Returns the age 18 from a datestring 1998-06-05T22:00:00.000Z", function(){
      var testData = "1998-06-05T22:00:00.000Z";
      var testAge = 18;
      assert.equal(testAge, dateController.getAge(testData));
    });
  });
  describe('getMonths()', function(){
    it("Returns a valid month from a datestring", function(){
      var testData = "1994-06-05T22:00:00.000Z";
      assert(dateController.getMonths(testData));
    });
    it("Returns June from the datestring 1994-06-05T22:00:00.000Z", function(){
      var testData = "1994-06-05T22:00:00.000Z";
      var testMonth = "June";
      assert.equal(testMonth, dateController.getMonths(testData));
    });
    it("Returns September from the datestring 1994-09-05T22:00:00.000Z", function(){
      var testData = "1994-09-05T22:00:00.000Z";
      var testMonth = "September";
      assert.equal(testMonth, dateController.getMonths(testData));
    });
  });


});
