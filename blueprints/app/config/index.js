'use strict';

let NODE_ENV = process.env.NODE_ENV;

if (!NODE_ENV) {
  NODE_ENV='development';
}

let baseConfig = require('./env/default.js');
let envConfig = require(`./env/${NODE_ENV}.js`);

let config = Object.assign(baseConfig, envConfig);

module.exports = config;
