var pathPackage     	= require('path');
var mongoose 					= require(pathPackage.join('.','/app/init/db')).mongoose;
var autoIncrement     = require(pathPackage.join('.','/app/init/db')).autoIncrement;
var Schema 						= mongoose.Schema;
var findOrCreate 			= require('mongoose-findorcreate');
var mongoosePaginate 	= require('mongoose-paginate');
var generator         = require('mongoose-gen');
var timestamps        = require('mongoose-timestamp');
var fs                = require('fs');
var _ 								= require('lodash');
var bcrypt            = require('bcrypt-nodejs');

var data = fs.readFileSync(__dirname+'/user.json', {encoding: 'utf8'});
var modelJSON = JSON.parse(data);


var schema = new mongoose.Schema(generator.convert(modelJSON.schema));

schema.pre('save', function(next) {
	var self = this;
  self.model('User').findOne({ email: self.email }, function(err, user) {
    if (err) {
      next(err);
    } else if (user) {
      next({message: 'email_already_exists'});
    } else {
      self.password = bcrypt.hashSync(self.password);
      next();
    }
  });

});

schema.plugin(findOrCreate);
schema.plugin(mongoosePaginate);
schema.plugin(timestamps);

schema.index({_id: 1, statusId: 1, companyId:1});
schema.index({_id: 1, statusId: 1});

autoIncrement.initialize(mongoose.connection);
schema.plugin(autoIncrement.plugin, { model: modelJSON.name, field: 'cursor' });

module.exports = mongoose.model(modelJSON.name, schema);