'use strict';

const oauthserver = require('@npmcorp/oauth2-server');
const Request = oauthserver.Request;
const Response = oauthserver.Response;
const config = require('../config');

function routes(server) {
  const oauthModel = require('../helpers/model');

  server.post(config.auth_url, (req, res, next) => {
    server.oauth.token(new Request(req), new Response(res), {
      model: oauthModel
    }, (err, result) => {
      if (err) {
        return next(err);
      }

      res.send(result);
    });
  });

}

module.exports = routes;

