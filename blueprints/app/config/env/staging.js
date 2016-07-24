'use strict';

let defaultConfig = {
  app: {
 		title: 'RESTeroids stg',
 		description: 'RESTeroids stg',
 		keywords: 'RESTeroids stg'
 	},
 	port: process.env.PORT || 3000,
  db: 'mongodb://localhost/resteroids-stg',
  auth: {
    google : {
      client_id: 'GOOGLE_CLIENT_ID',
      client_secret: 'GOOGLE_CLIENT_SECRET',
      redirect_uri : 'postmessage'
    }
  }
};

module.exports = defaultConfig;
