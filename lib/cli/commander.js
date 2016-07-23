'use strict';

const glob = require('glob');
const debug = require('debug')('resteroids:commander');
const bluebird = require('bluebird');

class Commander {

  constructor(options) {
    if (!options.baseDir) {
      throw new Error('Missing baseDir option');
    }

    if (!options.args) {
      throw new Error('Missing args option');
    }

    this._options = options;
    this._commands = {};
  }

  loadCommands() {
    let files = glob.sync(this._options.baseDir);

    files.map((file) => {
      debug(`Loading ${file}`);
      let loadedCommand = require(file);
      this.registerCommand(loadedCommand);
    });

  }

  registerCommand(command) {
    debug(`Registering command ${command.name}`);
    this._commands[command.name] = command;
  }

}
