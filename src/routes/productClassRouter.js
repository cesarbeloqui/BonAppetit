const express = require('express')
const router = express.Router()
const { createProductClass , allProductClasses , deleteProductClass , updateProductClass } = require ('../controllers/productClass.js')


// ruta que trae todos las clases de productos
router.get("/", async (req,res) => {
    try {
        const productClass = await allProductClasses()
        res.status(200).json(productClass)
    } catch (error) {res.status(400).json({error: error.message})}
      
});

// ruta para crear una clases de producto
router.post("/" , async (req,res) => {
    try {
        const {productClass} = req.body
        await createProductClass(productClass)
        res.status(201).send('Clase de producto creada con exito!!')
    } catch (error) {res.status(400).json({error: error.message})}
      
})

// ruta para borrar una clase de producto
router.delete("/:id" , async (req,res) => {
    try {
        const {id} = req.params
        const deleteClass = await deleteProductClass(id)
        res.status(201).send(deleteClass)
    } catch (error) {res.status(400).json({error: error.message})}
      
})

// ruta para actualizar clase de Producto
router.put("/:id" , async (req,res) => {
    try {
        const {id} = req.params
        const {productClass} = req.body
        console.log(productClass)
        console.log(id)
        const updateClass = await updateProductClass(id, productClass)
        res.status(201).send(updateClass)
    } catch (error) {res.status(400).json({error: error.message})}
      
})
module.exports = router