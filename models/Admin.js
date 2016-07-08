"use strict";
module.exports = function(sequelize, DataTypes){
var Admin = sequelize.define('Admin', {
  email: {
    type: DataTypes.STRING,
    allowNull : false
  },
  password: {
    type: DataTypes.STRING,
    allowNull : false
  },
});
return Admin;
};
