'use strict';

const BaseController = require('../controllers/base.controller');
const oauthserver = require('@npmcorp/oauth2-server');
const Request = oauthserver.Request;
const Response = oauthserver.Response;
const oauthModel = require('../helpers/oauth2/model');

function routes(server) {
  var thisController = new BaseController();

  server.post('/auth/login', (req, res, next) => {
    server.oauth.token(new Request(req), new Response(res), {
      model: oauthModel
    }, (err, result) => {
      res.send(result);
      console.log('pepe');

    });
    //thisController.handler(req, res, next);
  });

}

module.exports = routes;
