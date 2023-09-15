const {transporter} = require("./account_transport.js");

const mail_rover = async (callback) => {
    callback(transporter);
};

module.exports = { mail_rover};
