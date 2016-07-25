'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.model('OAuthToken', new Schema({
  accessToken: { type: String  },
  accessTokenExpiresOn: { type: Date  },
  clientId: { type: String  },
  refreshToken: { type: String  },
  refreshTokenExpiresOn: { type: Date  },
  userId: { type: String  }
}));

