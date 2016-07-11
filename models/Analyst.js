"use strict";
module.exports = function(sequelize, DataTypes){
var Analyst = sequelize.define('Analyst', {
  email: {
    type: DataTypes.STRING,
    allowNull : false
  },
  password: {
    type: DataTypes.STRING,
    allowNull : false
  },
});
return Analyst;
};
