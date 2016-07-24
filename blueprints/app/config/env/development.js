'use strict';

let defaultConfig = {
  app: {
 		title: 'RESTeroids dev',
 		description: 'RESTeroids dev',
 		keywords: 'RESTeroids dev'
 	},
 	port: process.env.PORT || 3000,
  db: 'mongodb://localhost/resteroids-dev',
  auth: {
    google : {
      client_id: 'GOOGLE_CLIENT_ID',
      client_secret: 'GOOGLE_CLIENT_SECRET',
      redirect_uri : 'postmessage'
    }
  }
};

module.exports = defaultConfig;
