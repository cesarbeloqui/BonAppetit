require("dotenv").config();
const sendGridTransport = require("nodemailer-sendgrid-transport");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport(sendGridTransport(
  {auth: {
    api_key: process.env.SENDGRID_API_KEY,
  }}
))

const accountTransport = {
  service: "gmail",
  auth: /* {
    user: "noreply.bonapptit@gmail.com",
    pass: "AIzaSyASSuf1Z9xx7P5utParruF0PGKgl9FSPAE",
  } */ {
    type: "OAuth2",
    user: process.env.USER_EMAIL,
    clientId: process.env.CLIENTID_EMAIL,
    clientSecret: process.env.CLIENT_SECRET_EMAIL,
    refreshToken: process.env.REFRESH_TOKEN_EMAIL,
  },
};

module.exports = {accountTransport, transporter};
