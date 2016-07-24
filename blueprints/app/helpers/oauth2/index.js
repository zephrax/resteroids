'use strict';

const restifyOAuth2 = require('restify-oauth2');
const hooks = require('./hooks');
const config = require('../../config');
const restify = require('restify');

const oauth2Helper = {

  setup : (server) => {
    restifyOAuth2.cc(server, { tokenEndpoint: config.tokenEndPoint, hooks: hooks });
  },

  middleware : (req, res, next) => {
    if (!req.user) {
      next(new restify.errors.ForbiddenError('Access denied'));
    } else {
      next();
    }
  }

};

module.exports = oauth2Helper;
