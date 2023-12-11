const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const loadingUsersFirebase = require('./src/utils/loadingUsersFirebase');
const loadingFamilyAndProduct = require('./src/utils/loadingFamilyAndProduct');
const { ProductClass } = require('./src/db.js');
const {
  initializeProductClassesArray,
} = require('./src/controllers/productClassController.js');

// Syncing all the models at once.
conn.sync({ alter: true }).then(async () => {
  server.listen(8100, () => {
    console.log('Server listening at 8100'); // eslint-disable-line no-console
  });
});
