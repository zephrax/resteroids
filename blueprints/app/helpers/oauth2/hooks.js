'use strict';

const crypto = require('crypto');
const mongoose = require('mongoose');

function generateToken(data) {
  let random = Math.floor(Math.random() * 100001);
  let timestamp = (new Date()).getTime();
  let sha256 = crypto.createHmac('sha256', random + 'WOO' + timestamp);

  return sha256.update(data).digest('base64');
}

exports.generateToken = generateToken;

exports.grantClientToken = function (credentials, req, cb) {
  const User = mongoose.model('User');

  User.findOne({email: credentials.clientId}, (err, user) => {
    if (err) {
      return cb(err, false);
    }

    if (user && user.hashPassword(credentials.clientSecret) === user.password) {
      let token = generateToken(credentials.clientId + ':' + credentials.clientSecret);
      user.token = token;

      user.save(() => {
        return cb(null, token);
      });
    } else {
      if (!user) {
        let token = generateToken(credentials.clientId + ':' + credentials.clientSecret);

        let userDoc = {
          email: credentials.clientId,
          password: credentials.clientSecret,
          token: token
        };

        let newUser = new User(userDoc);

        newUser.save(() => {
          return cb(null, token);
        });
      } else {
        cb(null, false);
      }
    }
  });

};

exports.authenticateToken = function (token, req, cb) {
  const User = mongoose.model('User');

  User.findOne({token: token}, (err, user) => {
    if (user) {
      user.salt = undefined;
      user.password = undefined;

      req.user = user;

      cb(null, true);
    } else {
      cb(null, false);
    }
  });

};
