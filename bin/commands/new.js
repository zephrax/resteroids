'use strict';

const Command = require('../../lib/cli/base-command');

class CommandNew extends Command {

  constructor(args) {
    super(args);

    this.name = 'new';
  }

  handler(params) {

  }

}

module.exports = CommandNew;

