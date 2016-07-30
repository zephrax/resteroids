'use strict';

const Promise = require('bluebird');
let Plugin = require('../../libs/plugin');

const oauth2Helper = require('./helpers/');

class OAuth2Plugin extends Plugin {

  constructor(options) {
    super(options);
  }

  bootstrapBefore() {
    return Promise.resolve();
  }

  bootstrapAfter() {
    oauth2Helper.setup(this._options.server); 
    return Promise.resolve();
  }

  routeMiddleware(req, res, next) {
    oauth2Helper.middleware(this._options.server, req, res, next);
  }
}

module.exports = OAuth2Plugin;

