require('dotenv').config();


const serviceAccountFirebase = {
  /* process.env.REFRESH_TOKEN_EMAIL */
  type: 'service_account',
  project_id: process.env.PROJECT_ID_BON,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: eval(process.env.PRIVATE_KEY),
  client_email: process.env.CLIENT_EMAIL_FIREBASE,
  client_id: process.env.CLIENTID_FIREBASE,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jr9zd%40bon-appetit-7ad3c.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
};

module.exports = serviceAccountFirebase;
