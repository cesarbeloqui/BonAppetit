const express = require("express");
const router = express.Router();
const {
  getProductByName,
  getProductByClass,
  getProductByStock,
  getProductByEnabled,
} = require("../handlers/filterProductHandler");

// ! TODOS LAS RUTAS DE LOS FILTRADOS SON POR QUERY

// ruta que trae los productos filtrados por nombre "?name="
router.get("/search_by_name", getProductByName);

// ruta que trae los productos filtrados por clase(tipo) "?className="
router.get("/search_by_class", getProductByClass);

// ruta que trae los productos filtrados por stock "?stock=boolean"
router.get("/search_by_stock", getProductByStock);

// ruta que trae los productos filtrados por producto habilitado o inhabilitado "?enable=boolean"
router.get("/search_by_enabled", getProductByEnabled);

module.exports = router;
