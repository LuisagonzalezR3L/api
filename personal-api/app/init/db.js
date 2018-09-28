var pathPackage 	= require('path');
var config 				= require(pathPackage.join('.','/config/config.js'))
var mongoose 			= require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var mongoConfig 	= {useMongoClient:true }

mongoose.connect(config.db.connectionString, mongoConfig);

module.exports = {
  mongoose : mongoose,
  autoIncrement : autoIncrement
};
