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
    Promise.each(Object.keys(this._plugins), (item, index) => {
      debug(`boostrapBefore ${item}...`);
      return this._plugins[item].bootstrapBefore();
    });
  }

  bootstrapAfter() {
    Promise.each(Object.keys(this._plugins), (item, index) => {
      debug(`boostrapAfter ${item}...`);
      return this._plugins[item].bootstrapAfter();
    });
  }
}

module.exports = PluginLoader;
