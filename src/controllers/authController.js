const handleVerifyEmail = require("../handlers/handleVerifyEmail");

const authController = (req, res) => {
  try {
    const { mode, oobCode, lang } = req.query;
    // Handle the user management action.
    switch (mode) {
      case "resetPassword":
        // Display reset password handler and UI.
        res.status(200).send({ mode, oobCode, lang });
        /*         handleResetPassword(auth, actionCode, continueUrl, lang); */
        break;
      case "verifyEmail":
        // Display email verification handler and UI.
        const response = handleVerifyEmail({ mode, oobCode, lang });
        res.status(200).send(response);
        /*         handleVerifyEmail(auth, actionCode, continueUrl, lang); */
        break;
      default:
        // Error: invalid mode.
        throw new Error(`Mode ${mode} is invalid.`);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = authController;
