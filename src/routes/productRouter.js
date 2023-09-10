const express = require("express");
const router = express.Router();
const {
  getAllProduct,
  putProduct,
  deleteProduct,
  postProduct,
  getProductDetail 
} = require("../handlers/productHandler");
const getFilterProduct = require("../handlers/filterProductHandler");

// ruta que trae todos los productos
router.get("/", getAllProduct);

// ruta para crear un producto
router.post("/", postProduct);

// ruta para borrar   ( borrado logico )
router.delete("/:id", deleteProduct);

// ruta para recuperar o editar producto
router.put("/:id", putProduct);

//rutas para filtrado de productos
/*
POR NOMBRE DE PRODUCTO(BUSCA COINCIDENCIA CON CUALQUIER STRING QUE LE PASEMOS) = /filter?name=string
POR NOMBRE DE CLASE(TIPO) POR EJEMPLO "MINUTAS" = /filter?className=string
POR STOCK, MUESTRA LOS PRODUCTOS QUE TENGAN STOCK MENOR O IGUAL AL NUMERO QUE LE PASAMOS = /filter?stock=number
POR PRODUCTO HABILITADO, TRUE LOS HABILITADOS, FALSE LOS INHABILITADOS = /filter?enable=boolean
POR PRECIO, MUESTRA LOS PRODUCTOS QUE TENGAN PRECIO MENOR O IGUAL AL NUMERO QUE LE PASAMOS = /filter?price=number
POR CALIFICACION, 1, 2, 3, 4, 5 = /filter?qualification=number
POR PRODUCTO BORRADO, TRUE SI QUIERO LOS BORRADOS(ESTA ES POR EL BORRADOR LOGICO, AHI ESTAN LOS "BORRADOS") = /filter?deleted=boolean

!SON TODOS COMBINABLES

EJEMPLO = /filter?name=milanesa&price=1000
En este ejemplo trae todos los productos que en su nombre contengan la palabra milanesa y valgan 1000 o menos de 1000.
*/
router.get("/filter", getFilterProduct);

router.get("/:productId", getProductDetail);

module.exports = router;
