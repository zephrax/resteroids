'use strict';

const path = require('path');
const glob = require('glob');
const debug = require('debug')('pluginloader');
const Promise = require('bluebird');

const defaultOptions = {
  path: path.resolve(`${__dirname}../../plugins/`)
};

class PluginLoader {

  constructor(options) {
    if (!options.server) {
      throw new Error('Server must be passed by param');
    }

    if (!options.path) {
      options.path = defaultOptions.path;
    }

    this._options = options;
    this._options.server.use((req,res,next) => {
      console.log('en el loader');
      next();
    });

    this._plugins = {};
  }

  loadPlugins() {
    const files = glob.sync(`${this._options.path}/*/`);
    const pluginOptions = {
      server: this._options.server
    };

    files.map((file) => {
      let pluginKey = path.basename(file);
      debug(`Loading plugin ${pluginKey}...`);
      let thisPlugin = require(file);
      this._plugins[pluginKey] = new thisPlugin(pluginOptions);
    });
  }

  bootstrapBefore() {
    return Promise.each(Object.keys(this._plugins), (item, index) => {
      if (this._plugins[item].bootstrapBefore) {
        debug(`boostrapBefore ${item}...`);
        return this._plugins[item].bootstrapBefore();
      } else {
        return Promise.resolve();
      }
    });
  }

  bootstrapAfter() {
    return Promise.each(Object.keys(this._plugins), (item, index) => {
      if (this._plugins[item].bootstrapAfter) {
        debug(`boostrapAfter ${item}...`);
        return this._plugins[item].bootstrapAfter();
      } else {
        return Promise.resolve();
      }
    });
  }

  routeMiddleware() {
    var self = this;
    
    Object.keys(this._plugins).forEach((item) => {
      if (this._plugins[item].routeMiddleware) {
        debug(`routeMiddleware ${item}...`);
        this._plugins[item].routeMiddleware(self._options.server);
      }
    });
  }
}

module.exports = PluginLoader;
