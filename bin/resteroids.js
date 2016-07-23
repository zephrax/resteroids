#!env node
'use strict';

const parseArgs = require('minimist');

let args = parseArgs(process.argv.slice(2));

console.log(args);

class PepeError extends Error {
  constructor(message) {
    super();

    this.code = 'PepeError';
    this.message = message;
  }
}

try {
  throw new PepeError('Josecito');
} catch (e) {
  console.log(e);
}
