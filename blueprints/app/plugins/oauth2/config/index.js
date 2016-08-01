'use strict';

const OAuth2Config = {

  auth_url : '/auth/login',

  ignore_urls: [
    '/some/url/to/exclude/from/authentication'
  ]

};

module.exports = OAuth2Config;
