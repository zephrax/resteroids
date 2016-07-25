'use strict';

const oauthserver = require('oauth2-server');
const config = require('../../config');
const restify = require('restify');

const oauth2Helper = {

  setup : (server) => {
    const oauthModel = require('./model');
    
    server.oauth = oauthserver({
      model: oauthModel,
      grants: [ 'password', 'client_credentials' ],
      debug: true
    });
  },

  middleware : (req, res, next) => {
    server.oauth.authorise(req, res, next);
  }

};

module.exports = oauth2Helper;

