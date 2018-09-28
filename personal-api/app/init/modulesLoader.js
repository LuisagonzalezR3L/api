var modulesRoot    = '/app/modules';
var routesFolder   = 'routes';
var pathPackage    = require('path');
var fs             = require('fs');
var authMiddleware = require(pathPackage.join('.', modulesRoot, '/jwt/middlewares/index.js'));

module.exports = function modulesLoader(app) {

  app.use(authMiddleware.loadUserFromRequest);
  
  listFoldersInFolder(modulesRoot)
  .forEach(function (moduleFolder) {
    requireFilesInFolder(pathPackage.join(modulesRoot, moduleFolder, routesFolder), app)
  });
  
};

function listFoldersInFolder (path) {
  var completePath = pathPackage.join('.', path);
  return fs.readdirSync(completePath)
  .filter(function (folder) {
    return fs.statSync(pathPackage.join(completePath, folder)).isDirectory();
  });
};


function requireFilesInFolder (path, app) {
  listFilesInFolder(path)
  .forEach(function (file) {  
    require(pathPackage.join('.', path, file))(app);
  });
};

function listFilesInFolder (path) {
  var completePath = pathPackage.join('.', path);
  return fs.readdirSync(completePath)
  .filter(function (file) {
    return file
  });
};