'use strict';

const mongoose = require('mongoose');
const OAuthClient = mongoose.model('OAuthClient');
const OAuthToken = mongoose.model('OAuthToken');
const User = mongoose.model('User');
const debug = require('debug')('oauth2:model');

let model = {

  getAccessToken: function(bearerToken) {
    debug(`getAccessToken ${bearerToken}`);
    return OAuthToken.findOne({
      accessToken: bearerToken
    });
  },

  getClient: function(clientId, clientSecret) {
    debug(`getClient ${clientId}:${clientSecret}`);
    OAuthClient.findOne({
      clientId: clientId,
      clientSecret: clientSecret
    }).then((a) => {
      debug('-- LALA --');
      debug(a);
      debug('-- LALA --');
    }).catch((err) => {
      debug(err);
    });

    return OAuthClient.findOne({
      clientId: clientId,
      clientSecret: clientSecret
    });
  },

  getUserFromClient: function(client) {
    debug(`getUserFromClient ${client.clientId}:${client.clientSecret}`);
    OAuthClient.findOne({
      clientId: client.clientId,
      clientSecret: client.clientSecret
    }).then((a) => {
      debug(a);
    }).catch((err) => {
      debug(err);
    });
    return OAuthClient.findOne({
      clientId: client.clientId,
      clientSecret: client.clientSecret
    });
  },

  getUser: function(email, password) {
    debug(`getUser ${email}:${password}`);
    return User.findOne({
      email: email,
      password: password
    });
  },

  getRefreshToken: function(refreshToken) {
    debug(`getRefreshToken ${refreshToken}`);
    return OAuthToken.findOne({
      refreshToken: refreshToken
    });
  },

  saveToken: function(token, client, user) {
    debug(`saveToken ${token} ${client} ${user}`);
    console.log(token);

    let accessToken = new OAuthToken({
      accessToken: token.accessToken,
      accessTokenExpiresOn: token.accessTokenExpiresOn,
      clientId: client.id,
      refreshToken: token.refreshToken,
      refreshTokenExpiresOn: token.refreshTokenExpiresOn,
      userId: user.id
    });

    return accessToken.save()
      .then(() => {
        return Promise.resolve({
          accessToken: token.accessToken,
          user: client,
          client: client,
          scope: 'all'
        });
      });
  },

  validateScope: function(accessToken) {
    debug(`Validate scope: ${accessToken}`);
    return true;
  }

};

module.exports = model;

