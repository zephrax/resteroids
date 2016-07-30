'use strict';

const oauthserver = require('@npmcorp/oauth2-server');
const debug = require('debug')('oauth2');
const Request = require('@npmcorp/oauth2-server').Request;
const Response = require('@npmcorp/oauth2-server').Response;

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
      let request = new Request(req);
      let response = new Response(res);
      server.oauth.authenticate(request, response, {}, next);
    });
  }

};

module.exports = oauth2Helper;
