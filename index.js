const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const loadingUsersFirebase = require('./src/utils/loadingUsersFirebase');
const loadingFamilyAndProduct = require('./src/utils/loadingFamilyAndProduct');
const { ProductClass } = require('./src/db.js');
const {
  initializeProductClassesArray,
} = require('./src/controllers/productClassController.js');

const port = process.env.PORT || 8100;

// Syncing all the models at once.
conn.sync({ alter: true }).then(async () => {
  server.listen(port, () => {
    console.log(`Server listening at ${port}`); // eslint-disable-line no-console
  });
});
