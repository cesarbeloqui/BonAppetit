const handlerBulkProducts = require("../handlers/handlerBulkProducts");


const bulkProducts = async (req, res) => {
  try {
    const data = req.body;
    const response = await handlerBulkProducts(data);
    if (response) {
      console.log("Datos insertados correctamente");
      res.status(200).json("Datos insertados correctamente");
    } else {
      throw new Error("Error al insertar datos");
    }
  } catch (error) {
    console.error("Error al insertar datos:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = bulkProducts;
