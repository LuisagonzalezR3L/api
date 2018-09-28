var _           = require('lodash');
var pathPackage = require('path');
var authService = require(pathPackage.join('.','/app/modules/jwt/services/authService.js'));
var userService = require(__dirname+'/../services/userService.js');

var exports         = module.exports;

exports.create = function create(req, res) {

  userService.createUser(req.body)
  .then((createdUser) => {
    
    authService.generateToken(createdUser, function(err, token){
      
      var user = createdUser.toObject();
      
      if (!err && token) {
        user.token = token;
      }
      
      delete user.password; 
      res.ok({data: user});

    });
    
  })
  .catch((err) => {
    res.badRequest(err)
  });
  
};

exports.read = function read(req, res) {
  res.ok({data: req.user});
};
