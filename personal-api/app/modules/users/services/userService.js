var bcrypt          = require('bcrypt-nodejs');
var _               = require('lodash');
var async           = require('async');
var i18n            = require('i18n');
var User            = require(__dirname+'/../models/user.js');

var exports         = module.exports;


exports.createUser = function createUser(data) {
  return new Promise((resolve, reject) => {
    User.create(data, function (err, result) {
      if (err) {
        return reject(err);
      }
      resolve(result);

    });

  });

};
