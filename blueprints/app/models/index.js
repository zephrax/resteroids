'use strict';

const path = require('path');
const glob = require('glob');
const debug = require('debug')('models');
const mongoose = require('mongoose');

const models = {
  setup : () => {
    let files = glob.sync(`${__dirname}/**/*.model.js`);

    files.map((file) => {
      debug(`Loading ${file}...`);
      require(file);
    });
  }
};

module.exports = models;
