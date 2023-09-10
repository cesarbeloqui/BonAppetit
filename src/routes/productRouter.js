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
const bulkProducts = require("../controllers/bulkProducts");
// ruta que trae todos los productos
router.get("/", getAllProduct);

// ruta para crear un producto
router.post("/", postProduct);
router.post("/bulk", bulkProducts);

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
POR PRECIO MINIMO, MUESTRA LOS PRODUCTOS QUE TENGAN PRECIO MAYOR O IGUAL AL NUMERO QUE LE PASAMOS = /filter?priceMin=number
POR PRECIO MAXIMO, MUESTRA LOS PRODUCTOS QUE TENGAN PRECIO MENOR O IGUAL AL NUMERO QUE LE PASAMOS = /filter?priceMax=number
POR PRECIO POR RANGO, FILTRA LOS PRECIOS POR RANGO, MAYOR O IGUAL QUE priceMin Y MENOR O IGUAL QUE priceMax = /filter?priceMin=number&priceMax=number
POR CALIFICACION, 1, 2, 3, 4, 5 = /filter?qualification=number
POR PRODUCTO BORRADO, TRUE SI QUIERO LOS BORRADOS(ESTA ES POR EL BORRADOR LOGICO, AHI ESTAN LOS "BORRADOS") = /filter?deleted=boolean

!SON TODOS COMBINABLES

EJEMPLO = /filter?name=milanesa&price=1000
En este ejemplo trae todos los productos que en su nombre contengan la palabra milanesa y valgan 1000 o menos de 1000.
*/
router.get("/filter", getFilterProduct);

router.get("/:productId", getProductDetail);

module.exports = router;
