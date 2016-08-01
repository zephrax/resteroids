'use strict';

/**
 * List of available methods to be implemented
 */
const availablePluginMethods = [ 'bootstrapBefore', 'bootstrapAfter', 'routeMiddleware' ];

class Plugin {
  
  constructor(options) {
    if (!options.server) {
      throw new Error('Server must be passed by param');
    }

    let implementedMethods = 0;
    availablePluginMethods.forEach((method) => {
      if (typeof this[method] === 'function') {
        implementedMethods++;
      }
    });

    if (implementedMethods === 0) {
      throw new Error('Plugin must implement at least on of the following methods: ' + availablePluginMethods.join(', '));
    }

    this._options = options;
  }

}

module.exports = Plugin;

