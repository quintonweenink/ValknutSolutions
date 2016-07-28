"use strict";
module.exports = function(sequelize, DataTypes){
var Lead = sequelize.define('Lead', {
  leadID: {
    type: DataTypes.STRING,
    allowNull : false
  },
  adID: {
    type: DataTypes.INTEGER,
    allowNull : false
  },
  userID : {
    type: DataTypes.INTEGER,
    allowNull: false
  }/*,
  createdTime : {
    type: DataTypes.DATE,
    allowNull: false
  }*/
});
return Lead;
};
