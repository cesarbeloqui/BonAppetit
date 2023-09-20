const admin = require("firebase-admin");

const handleVerifyToken = async (token) => {
    const response = await admin.auth().verifyIdToken(token)
    return response;
};

module.exports = handleVerifyToken;