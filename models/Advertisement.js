"use strict";
module.exports = function(sequelize, DataTypes){
var Advertisement = sequelize.define('Advertisement', {
  advertisementID: {
    type: DataTypes.STRING,
    allowNull : false
  },
  pageID: {
    type: DataTypes.INTEGER,
    allowNull : false
  }
});
return Advertisement;
};
