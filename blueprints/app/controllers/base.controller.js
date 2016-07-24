'use strict';

const Controller = require('../libs/controller');

const mongoose = require('mongoose');
const User = mongoose.model('User');

class BaseController extends Controller {

  handler(req, res, next) {
    res.send({status: 'ok'});
  }

  secureHandler(req, res, next) {
    res.send({status: 'secure_ok'});
  }
}

module.exports = BaseController;
