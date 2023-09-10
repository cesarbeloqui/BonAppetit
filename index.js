const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const loadingUsersFirebase = require("./src/utils/loadingUsersFirebase");
const loadingFamilyAndProduct = require("./src/utils/loadingFamilyAndProduct");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log("Server listening at 3001"); // eslint-disable-line no-console
  });
});
