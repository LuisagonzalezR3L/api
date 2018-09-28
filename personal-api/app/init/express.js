var express         = require('express');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var session         = require('express-session');
var i18n            = require('i18n');
var cors            = require('cors');
var pathPackage     = require('path')
var multipart       = require('connect-multiparty');
var config          = require(pathPackage.join('.','/config/config.js'))
module.exports = function initApp() {

  var app = express();

  i18n.configure({
    locales: ['es'],
    defaultLocale: 'es',
    directory: __dirname + '/locales'
  });

  app
    .use(logger('dev'))            
    .use(cookieParser())           
    .use(bodyParser.json())        
    .use(bodyParser.urlencoded({   
      extended: false
    }))
    .use(multipart({
      uploadDir: '/tmp/'
    }))
    .use(session({                  
      secret: config.web.sessionSecret,
      resave: false,
      saveUninitialized: true
    }))
    .use(express.static(pathPackage.join('.','public')))
    .use(i18n.init)
    .use(cors({credentials:true, origin:true}));

  app.disable('x-powered-by');
  
  require('express-custom-response')(__dirname+ '/responses');
 
  require(__dirname+'/modulesLoader')(app);

  var server = app.listen(config.web.port, function() {
    var port = server.address().port;
    console.log("Server running, port ", port);
    return server;
  });
  
};
