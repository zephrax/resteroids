'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs-extra'));
const path = require('path');
const debug = require('debug')('resteroid:command:new');

const Command = require('../../lib/cli/base-command');

class CommandNew extends Command {

  constructor(args) {
    super(args);

    this.name = 'new';
  }

  handler(params) {
    const source = path.resolve(`${__dirname}../../../blueprints/app`);
    const target = path.resolve(this._args._[0] ? this._args._[0] : process.cwd());

    debug(source);
    debug(target);

    fs.copy(source, target, (err, results) => {
      this.output('Project bootstraped');
    });
  }

}

module.exports = CommandNew;

