'use strict';

let defaultConfig = {
  app: {
 		title: 'RESTeroids prod',
 		description: 'RESTeroids prod',
 		keywords: 'RESTeroids prod'
 	},
 	port: process.env.PORT || 3000,
  db: 'mongodb://localhost/resteroids-prod',
  auth: {
    google : {
      client_id: 'GOOGLE_CLIENT_ID',
      client_secret: 'GOOGLE_CLIENT_SECRET',
      redirect_uri : 'postmessage'
    }
  }
};

module.exports = defaultConfig;
