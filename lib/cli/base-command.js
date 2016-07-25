'use strict';

class Command {

  constructor(args) {
    this._args = JSON.parse(JSON.stringify(args));
    this._args._ = this._args._.slice(1);
  }

  output(data) {

  }
}

module.exports = Command;

