'use strict';

const glob = require('glob');
const debug = require('debug')('resteroids:commander');

class Commander {

  constructor(options) {
    if (!options.baseDir) {
      throw new Error('Missing baseDir option');
    }

    if (!options.args) {
      throw new Error('Missing args option');
    }

    debug(options);

    this._options = options;
    this._commands = {};
  }

  loadCommands() {
    let files = glob.sync(`${this._options.baseDir}/*.js`);
 
    debug(files);
 
    files.map((file) => {
      debug(`Loading ${file}`);
      let loadedCommand = require(`${file}`);
      this.registerCommand(new loadedCommand());
    });

  }

  registerCommand(command) {
    debug(`Registering command ${command.name}`);
    this._commands[command.name] = command;
  }

  handler() {
    if (!this._options.args._.length) {
      return;
    }

    if (typeof this._commands[this._options.args._[0]] !== 'undefined') {
      this._commands[this._options.args._[0]].handler(this._options.args._.slice(1));
    }  
  }

}

module.exports = Commander;

