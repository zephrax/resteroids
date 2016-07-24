'use strict';

class Command {

  constructor(args) {
    this._args = JSON.parse(JSON.stringify(args));
    console.log(this._args);
    this._args._ = this._args._.slice(1);
    console.log(this._args);
  }

}

module.exports = Command;

