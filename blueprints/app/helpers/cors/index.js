'use strict';

const restify = require('restify');

const corsHelper = {

  setup : (server) => {
    restify.CORS.ALLOW_HEADERS.push('authorization');
    restify.CORS.ALLOW_HEADERS.push('withcredentials');
    restify.CORS.ALLOW_HEADERS.push('x-requested-with');
    restify.CORS.ALLOW_HEADERS.push('x-forwarded-for');
    restify.CORS.ALLOW_HEADERS.push('x-real-ip');
    restify.CORS.ALLOW_HEADERS.push('x-customheader');
    restify.CORS.ALLOW_HEADERS.push('user-agent');
    restify.CORS.ALLOW_HEADERS.push('keep-alive');
    restify.CORS.ALLOW_HEADERS.push('host');
    restify.CORS.ALLOW_HEADERS.push('accept');
    restify.CORS.ALLOW_HEADERS.push('connection');
    restify.CORS.ALLOW_HEADERS.push('upgrade');
    restify.CORS.ALLOW_HEADERS.push('content-type');
    restify.CORS.ALLOW_HEADERS.push('dnt');
    restify.CORS.ALLOW_HEADERS.push('if-modified-since');
    restify.CORS.ALLOW_HEADERS.push('cache-control');

    server.use((req, res, next) => {
      res.header( 'Access-Control-Allow-Credentials', true);
      res.header( 'Access-Control-Allow-Headers', restify.CORS.ALLOW_HEADERS.join(', '));
      res.header( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header( 'Access-Control-Allow-Origin', req.headers.origin);
      res.header( 'Access-Control-Max-Age', 0);
      next();
    });

    server.on('MethodNotAllowed', function (req, res ) {
      if (req.method.toUpperCase() === 'OPTIONS') {
        res.header( 'Content-type', 'text/plain charset=UTF-8');
        res.header( 'Content-length', 0);
        return res.send(204);
      } else {
        res.status(405);
        res.send(new restify.errors.MethodNotAllowedError());
      }
    });
  }

};

module.exports = corsHelper;
