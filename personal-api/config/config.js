var _ = require('lodash');

var defaultConfig = {
  'web': {
    'sessionSecret': 'secret',
    'port': 1337
  },
  'jwt': {
    'tokenSecret': 'tr3lsecret'
  },
  'db': {
    'connectionString': 'mongodb://localhost/personal-db'
  }
};

module.exports = (function () {
  var envConfig = require('./env/'+ (process.env.NODE_ENV ? process.env.NODE_ENV : 'local'));
  var config = _.merge(defaultConfig, envConfig);
  return config;

 })();
