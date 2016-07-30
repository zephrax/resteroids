'use strict';

const config = require('./config');
const bootstrap = require('./config/bootstrap');
const restify = require('restify');

let server = restify.createServer({
  name: config.app.title,
  version: config.app.version
});

bootstrap(server);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
