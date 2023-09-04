const express = require('express')
const router = express.Router()
const {   
    getAllProduct,
    putProduct,
    deleteProduct,
    postProduct,} = require ('../handlers/productHandler')


// ruta que trae todos las clases de productos. se le pasa por query "deleted" para filtrar productos borrados
router.get("/", getAllProduct);

// ruta para crear un producto
router.post("/" , postProduct)

// ruta para borrar   ( borrado logico )
router.delete("/:id" , deleteProduct)

// ruta para recuperar o editar producto   
router.put("/:id" , putProduct)

module.exports = router