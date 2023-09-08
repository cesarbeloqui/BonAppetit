const server = require("./src/app.js");
const { conn, User } = require("./src/db.js");
const admin = require("firebase-admin");

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  const { users } = await admin.auth().listUsers();
  try {
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
    console.log("Los usuarios de Firebase han sido cargados correctamente");
  } catch (error) {
    console.error("Error al cargar datos iniciales:", error);
  }
  server.listen(3001, () => {
    console.log("Server listening at 3001"); // eslint-disable-line no-console
  });
});
