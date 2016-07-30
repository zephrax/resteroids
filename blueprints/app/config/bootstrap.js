'use strict';

const config = require('../config');
const mongoose = require('mongoose');
const Promise = require('bluebird');

const restify = require('restify');

const restifyValidation = require('node-restify-validation');

const routes = require('../routes');
const models = require('../models');

//const oauth2 = require('../helpers/oauth2');
const cors = require('../helpers/cors');

const path = require('path');
const PluginLoader = require('../libs/plugins/loader');

function bootstrap(server) {
  const pluginLoader = new PluginLoader({
    server: server,
    path: path.resolve(`${__dirname}/../plugins/`)
  });
  pluginLoader.loadPlugins();

  mongoose.Promise = Promise;
  mongoose.set('debug', true);

  pluginLoader.bootstrapBefore();

  server.use(restify.acceptParser(server.acceptable));
  server.use(restify.authorizationParser());
  //server.use(restify.urlEncodedBodyParser({ mapParams: false }));
  server.use(restify.queryParser());
  server.use(restify.bodyParser({
    mapParams: false
  }));
  cors.setup(server);

  server.use(restifyValidation.validationPlugin({
    errorsAsArray: false,
    forbidUndefinedVariables: false,
    errorHandler: restify.errors.InvalidArgumentError
  }));

  mongoose.connect(config.db);

  models.setup();
  server.use(restify.CORS());
  //oauth2.setup(server);
  
  pluginLoader.bootstrapAfter();

  routes.setup(server);

  server.on('uncaughtException', function(req, res, route, err) {
    console.log(err.stack);
  });
}

module.exports = bootstrap;
