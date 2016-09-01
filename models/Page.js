"use strict";
module.exports = function(sequelize, DataTypes){
var Page = sequelize.define('Page', {
  pageName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pageID: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pageAccessToken: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
return Page;
};
