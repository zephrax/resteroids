'use strict';

let defaultConfig = {
  app: {
    title: 'RESTeroids Default',
    description: 'RESTeroids Default',
    keywords: 'RESTeroids',
    version: '0.1.0'
  },
  port: process.env.PORT || 3000,
  db: 'mongodb://localhost/resteroids',
  tokenEndPoint: '/auth/login'
};

module.exports = defaultConfig;
