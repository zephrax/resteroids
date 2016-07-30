'use strict';

class Plugin {
  // Base plugin that shares functionality
  constructor(options) {
    if (!options.server) {
      throw new Error('Server must be passed by param');
    }

    this._options = options;
  }

}

module.exports = Plugin;

