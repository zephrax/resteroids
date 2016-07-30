'use strict';

const Promise = require('bluebird');
let Plugin = require('../../libs/plugin');

const oauth2Helper = require('./helpers/');

const debug = require('debug')('oauth2plugin');

class OAuth2Plugin extends Plugin {

  constructor(options) {
    super(options);

    this._options.server.use((req,res,next) => {
      console.log('en el plugin1');
      next();
    });
  }

  bootstrapBefore() {
    oauth2Helper.setup(this._options.server); 
    return Promise.resolve();
  }

  bootstrapAfter() {
    return Promise.resolve();
  }

  routeMiddleware(server) {
    debug('Setting up middleware');
    oauth2Helper.middleware(this._options.server);
  }
}

module.exports = OAuth2Plugin;

