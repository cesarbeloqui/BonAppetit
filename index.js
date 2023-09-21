const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const loadingUsersFirebase = require("./src/utils/loadingUsersFirebase");
const loadingFamilyAndProduct = require("./src/utils/loadingFamilyAndProduct");
const { ProductClass } = require("./src/db.js")
const { initializeProductClassesArray} = require("./src/controllers/productClassController.js")

// Syncing all the models at once.
conn.sync({ alter: true }).then(async () => {
  try {
    await loadingUsersFirebase();
    console.log("Los usuarios de Firebase han sido cargados correctamente");
    const dataClasesProducts = await ProductClass.findAll();
    dataClasesProducts.length < 1 && (await loadingFamilyAndProduct());
    console.log(
      "Los productos con sus familias han sido cargados correctamente"
    );
    initializeProductClassesArray();
  } catch (error) {
    console.error("Error al cargar datos iniciales:", error);
  }
  server.listen(3001, () => {
    console.log("Server listening at 3001"); // eslint-disable-line no-console
  });
});
