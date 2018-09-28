var _       = require('lodash');
var i18n    = require('i18n');

var isLoggedIn = function(req, res, next) {
    (!!req.user) ? next() : res.unauthorized({message:'unauthorized'});
}

var isAdmin = function (req, res, next) {

  if (req.user && req.user.role.toLowerCase() == 'admin') {
    next();
  } else {
    return res.unauthorized({message:'unauthorized'});
  }
};


var policies = {
  isAdmin: isAdmin,
  isLoggedIn: isLoggedIn
};

module.exports = policies;