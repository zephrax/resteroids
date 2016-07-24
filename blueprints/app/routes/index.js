'use strict';

const path = require('path');
const glob = require('glob');
const debug = require('debug')('routes');

const routes = {
  setup : (server) => {
    let files = glob.sync(`${__dirname}/**/*.route.js`);

    files.map((file) => {
      debug(`Loading ${file}...`);
      require(file)(server);
    });
  }
};

module.exports = routes;
