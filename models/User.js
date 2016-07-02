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
  age: {
    type: DataTypes.INTEGER,
    allowNull : false
  },
  location : {
    type: DataTypes.STRING,
    allowNull : true
  }
});
return User;
};
