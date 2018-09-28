var pathPackage   = require('path');
var User          = require(pathPackage.join('.','/app/modules/users/models/user.js'));
var authService   = require(__dirname+ '/../services/authService.js');

var exports = module.exports;

exports.loadUserFromRequest = function loadUserFromRequest( req, res, next ) {

    authService.verifyAuthToken(req, function verifyAuthToken( err, decodedData ) {
        if( !err && decodedData ){
          
            User.findById( decodedData._id ).lean().exec( function ( err, user ) {
                
                if( !err && user ){
                    delete user.password
                    user.id = user._id;                    
                    req.user = user;
                }
                next();

            });

        }else{
            next();
        }

    });

};