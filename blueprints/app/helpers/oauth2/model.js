'use strict';

const mongoose = require('mongoose');
const OAuthClient = mongoose.model('OAuthClient');
const OAuthToken = mongoose.model('OAuthToken');
const User = mongoose.model('User');

let model = {

  getAccessToken: function (bearerToken) {
    return OAuthToken.findOne({ accessToken: bearerToken });
  },

  getClient: function (clientId, clientSecret) {
    return OAuthClient.findOne({ clientId: clientId, clientSecret: clientSecret });
  },

  getUser: function (email, password) {
    return User.findOne({ email: email, password: password  });
  },

  getRefreshToken: function (refreshToken) {
    return OAuthToken.findOne({ refreshToken: refreshToken  });
  },

  saveToken: function (token, client, user) {
    let accessToken = new OAuthToken({
      accessToken: token.accessToken,
      accessTokenExpiresOn: token.accessTokenExpiresOn,
      clientId: client.id,
      refreshToken: token.refreshToken,
      refreshTokenExpiresOn: token.refreshTokenExpiresOn,
      userId: user.id                           
    });

    return accessToken.save();
  }

};

module.exports = model;

