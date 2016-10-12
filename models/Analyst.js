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
   salt : {
     type : DataTypes.STRING,
     allowNull : true,
     defaultValue : "none"
   }
});
return Analyst;
};
