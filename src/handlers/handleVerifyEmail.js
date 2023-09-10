const admin = require("firebase-admin");

const handleVerifyEmail = async (object) => {
  const { oobCode } = object;
  try {
    const response = await admin.auth().applyActionCode(oobCode);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = handleVerifyEmail;
