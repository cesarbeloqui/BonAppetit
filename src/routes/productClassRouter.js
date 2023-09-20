const express = require("express");
const router = express.Router();
const {
  getAllProductClasses,
  postProductClass,
  deleteProductClass,
  putProductClass,
  arrayProductClass,
} = require("../handlers/productClassHandler.js");

// ruta que trae todos las clases de productos
router.get("/", getAllProductClasses);

// ruta para crear una clases de producto
router.post("/", postProductClass);

// ruta para borrar una clase de producto
router.delete("/:id", deleteProductClass);

// ruta para actualizar clase de Producto
router.put("/:id", putProductClass);

router.get("/array", arrayProductClass);

module.exports = router;
