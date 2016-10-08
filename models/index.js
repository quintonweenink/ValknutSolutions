"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require('../config/config.json')[env];
var dburl

if (env != "development"){
  var pg = require('pg');
  pg.defaults.ssl = true;
  dburl = process.env.DATABASE_URL
}
else {
	dburl = config.url
}


var sequelize = new Sequelize(dburl);
var db = {};

fs.readdirSync(__dirname).filter(function(file) {
 return (file.indexOf(".") !== 0) && (file !== "index.js");
}).forEach(function(file) {
 var model = sequelize["import"](path.join(__dirname, file));
 db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
 if ("associate" in db[modelName]) {
 db[modelName].associate(db);
 }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
