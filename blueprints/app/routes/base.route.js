'use strict';

const BaseController = require('../controllers/base.controller');
//const oauth2 = require('../helpers/oauth2');

function routes(server) {
  var thisController = new BaseController();

  server.get('/', (req, res, next) => {
    thisController.handler(req, res, next);
  });

  //server.get('/secure', oauth2.middleware, (req, res, next) => {
  //  thisController.secureHandler(req, res, next);
  //});
}

module.exports = routes;
