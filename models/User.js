"use strict";
module.exports = function(sequelize, DataTypes){
var User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull : false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull : false
  },
  phoneNumber : {
    type : DataTypes.STRING,
    allowNull : false
  },
  maritalStatus : {
    type : DataTypes.STRING,
    allowNull : false
  },
  dateOfBirth : {
    type : DataTypes.DATE,
    allowNull : false
  },
  gender : {
    type : DataTypes.STRING,
    allowNull : false
  },
  city : {
    type: DataTypes.STRING,
    allowNull : true
  },
  email : {
    type: DataTypes.STRING,
    allowNull : false
  }
});
return User;
};
