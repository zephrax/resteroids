#!env node
'use strict';

const parseArgs = require('minimist');
const Commander = require('../lib/cli/commander');

let args = parseArgs(process.argv.slice(2));

const options = {
  baseDir : `${__dirname}/commands/`,
  args : args
};

let commandCenter = new Commander(options);
commandCenter.loadCommands();
commandCenter.handler();

