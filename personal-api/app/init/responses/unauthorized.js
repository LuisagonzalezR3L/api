module.exports = function(responseData) {
  var i18n            = require('i18n');

  if(!responseData)
    responseData = {};

  var res = this;

  var responseObj = {
    code: 401,
    message: responseData.message ? i18n.__(responseData.message) : '',
    data: responseData.data ? responseData.data : responseData
  }

  res.status(responseObj.code).send(responseObj);


};