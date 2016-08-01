'use strict';

const Promise = require('bluebird');
let Plugin = require('../../libs/plugin');

const oauth2Helper = require('./helpers/');

const debug = require('debug')('oauth2plugin');
const routes = require('./routes/auth.route');

class OAuth2Plugin extends Plugin {

  constructor(options) {
    super(options);
  }

  bootstrapBefore() {
    routes(this._options.server);
    oauth2Helper.setup(this._options.server); 
    return Promise.resolve();
  }

  bootstrapAfter() {
    return Promise.resolve();
  }

  routeMiddleware() {
    debug('Setting up middleware');
    oauth2Helper.middleware(this._options.server);
  }
}

module.exports = OAuth2Plugin;

