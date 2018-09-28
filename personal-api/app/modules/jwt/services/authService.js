var _               = require('lodash');
var jwt             = require('jsonwebtoken');
var pathPackage     = require('path');
var config          = require(pathPackage.join('.','/config/config.js'));
var exports         = module.exports;


/**
 * Generates jwt token
 * @param  {Object}  user User instance
 * @param  {Function} cb   Optional function to return the token on a callback
 * @return String        Return the jwt token
 */
exports.generateToken = function(user, cb){
    var payload = { "_id": user._id};
    var secret = config.jwt.tokenSecret;
    var token = jwt.sign( payload, secret );
    if(cb && typeof cb == 'function'){
      cb(null, token);
    }
    return token;
};


/**
 * Verify the presence and validity of jwt token
 * @param  {Object}   req      Express Request Object
 * @param  {Function} callback Callback function
 */
exports.verifyAuthToken = function(req, callback){
    
  if(req.headers.authorization){
      
    var authInfo = req.headers.authorization.split(' ')
    
    if(authInfo.length == 2){
        
        var token = _.trim(authInfo[1]);
        
        jwt.verify(token, config.jwt.tokenSecret, callback);

    }else{
        callback( { message:'invalid_token' } )
    }

  }else{

      callback( { message:'no_token_present' } )

  }
};

