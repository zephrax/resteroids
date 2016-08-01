'use strict';

const oauthserver = require('@npmcorp/oauth2-server');
const debug = require('debug')('oauth2');
const Request = require('@npmcorp/oauth2-server').Request;
const Response = require('@npmcorp/oauth2-server').Response;
const config = require('../config');
const oauth2Helper = {

  setup: (server) => {
    const oauthModel = require('./model');

    server.oauth = new oauthserver({
      model: oauthModel
    });
  },

  middleware: (server) => {
    server.use((req, res, next) => {
      debug('oauth middleware');
      let ignore_urls = config.ignore_urls;
      ignore_urls.push(config.auth_url);
      if (ignore_urls.indexOf(req.path()) > -1) {
        return next();
      }

      let request = new Request(req);
      let response = new Response(res);
      server.oauth.authenticate(request, response, {}, next);
    });
  }

};

module.exports = oauth2Helper;
