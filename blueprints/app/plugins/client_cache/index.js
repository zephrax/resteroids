'use strict';

const Promise = require('bluebird');
let Plugin = require('../../libs/plugin');
const debug = require('debug')('client_cache');
const etag = require('etag');
const restify = require('restify');
const async = require('async');

class ClientCachePlugin extends Plugin {

  constructor(options) {
    super(options);
  }

  bootstrapBefore() {
    return Promise.resolve();
  }

  bootstrapAfter() {
    return Promise.resolve();
  }

  routeMiddleware() {
    let oldWrite,
      oldWriteHead,
      oldEnd;

    let chunks = [];
    let headers = [];

    this._options.server.use((req, res, nextM) => {
      oldWrite = res.write;
      oldWriteHead = res.writeHead;
      oldEnd = res.end;

      chunks = [];
      headers = [];

      res.writeHead = function(status, hds) {
        console.log(status);
        console.log(hds);
        headers.push(arguments);
      };

      res.write = function(chunk) {
        chunks.push(chunk);
      };

      res.end = function(chunk) {
        if (chunk)
          chunks.push(chunk);

        res.writeHead = oldWriteHead;
        res.write = oldWrite;
        res.end = oldEnd;

        const strEtag = etag(chunks.join(''));
        res.setHeader('etag', strEtag);
        debug('Generated etag: ' + strEtag);

        async.eachSeries(restify.conditionalRequest(), (conditionalRequestMiddleware, nextConditionalRequestMiddleware) => {
          conditionalRequestMiddleware(req, res, (stopChainFlag) => {
            debug('nextConditionalRequestMiddleware');
            if (stopChainFlag === false) {
              nextConditionalRequestMiddleware(new Error('Send client cache headers'));
            } else {
              nextConditionalRequestMiddleware();
            }
          });
        }, (err) => {
          if (!err) {
            headers.forEach((header) => {
              oldWriteHead.apply(res, header);
            });

            chunks.forEach((chunk) => {
              oldWrite.apply(res, [chunk]);
            });

            oldEnd.apply(res, arguments);
          }
        });
      };

      nextM();
    });

  }
}

module.exports = ClientCachePlugin;
