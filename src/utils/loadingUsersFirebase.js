const admin = require("firebase-admin");
const { User } = require("../db");
const loadingUsersFirebase = async () => {
  const { users } = await admin.auth().listUsers();
  for (const user of users) {
    await User.findOrCreate({
      where: { email: user.email },
      defaults: {
        id: user.uid,
        displayName: user.displayName,
        email: user.email,
      },
    });
  }
};
module.exports = loadingUsersFirebase;
