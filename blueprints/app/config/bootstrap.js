'use strict';

const config = require('../config');
const mongoose = require('mongoose');
const Promise = require('bluebird');

const restify = require('restify');

const restifyValidation = require('node-restify-validation');

const routes = require('../routes');
const models = require('../models');

const oauth2 = require('../helpers/oauth2');
const cors = require('../helpers/cors');

function bootstrap(server) {
  mongoose.Promise = Promise;
  mongoose.set('debug', true);

  server.use(restify.acceptParser(server.acceptable));
  server.use(restify.authorizationParser());
  server.use(restify.queryParser());
  server.use(restify.bodyParser());
  cors.setup(server);

  server.use(restifyValidation.validationPlugin( {
      errorsAsArray: false,
      forbidUndefinedVariables: false,
      errorHandler: restify.errors.InvalidArgumentError
  }));

  mongoose.connect(config.db);

  models.setup();
  server.use(restify.CORS());
  oauth2.setup(server);
  routes.setup(server);
}

module.exports = bootstrap;

