"use strict";
module.exports = function(sequelize, DataTypes){
var User = sequelize.define('User', {
  first_name: {
    type: DataTypes.STRING,
    allowNull : false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull : false
  },
  phone_number : {
    type : DataTypes.STRING,
    allowNull : false
  },
  marital_status : {
    type : DataTypes.STRING,
    allowNull : false
  },
  date_of_birth : {
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
  },
  processed : {
    type : DataTypes.BOOLEAN,
    allowNull : true,
    defaultValue : false
  },
  from : {
    type : DataTypes.STRING,
    allowNull : true,
    defaultValue : "Web"
  }
});
return User;
};
