require("dotenv").config();

const accountTransport = {
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.USER_EMAIL,
    clientId: process.env.CLIENTID_EMAIL,
    clientSecret: process.env.CLIENT_SECRET_EMAIL,
    refreshToken: process.env.REFRESH_TOKEN_EMAIL,
  },
/*   tls: {
    rejectUnauthorized: false,
  } */
};

module.exports = accountTransport;
