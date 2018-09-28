var async           = require('async');
var bcrypt          = require('bcrypt-nodejs');
var jwt             = require('jsonwebtoken');
var _               = require('lodash');
var pathPackage     = require('path');
var config          = require(pathPackage.join('.','/config/config.js'));
var User            = require(pathPackage.join('.','/app/modules/users/models/user.js'));
var userService     = require(pathPackage.join('.','/app/modules/users/services/userService.js'));
var authService     = require(__dirname+ '/../services/authService.js');

var express         = require('express');
var app             = express(); 
var exports         = module.exports;

exports.login = function login( req, res ){
 
    var params = req.body;

    async.waterfall([
      function( callback ) { 
        User.findOne( { email: params.email }, function(err, user){
            if ( user ){
              callback( null, user );
            }else{
                err ? callback( err ) : callback( 'unknown_email' );    
            } 
        }).lean();        
      }, function( user, callback ) { 
        if( bcrypt.compareSync( params.password, user.password ) ){
            callback( null, user);
        }else{
            callback( 'wrong_password' );   
        }
      }, function (user, callback){
          callback( null, user);
      }
    ], function(err, user){
      if(err){
        res.unauthorized({message: err});
      }else{
        var response = _.clone(user)
        response.token =  authService.generateToken(user);
        delete response.password;
        res.ok(response);
      }
    });   
};

