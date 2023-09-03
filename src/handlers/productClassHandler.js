const {
  createProductClass,
  findAllProductClasses,
  destroyProductClass,
  updateProductClass,
} = require("../controllers/productClassController.js");

// handler que trae todos las clases de productos
const getAllProductClasses = async (req, res) => {
  try {
    const productClass = await findAllProductClasses();
    res.status(200).json(productClass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// handler para crear una clases de producto
const postProductClass = async (req, res) => {
  try {
    const { productClass } = req.body;
    await createProductClass(productClass);
    res.status(201).send("Clase de producto creada con exito!!");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// handler para borrar una clase de producto
const deleteProductClass = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteClass = await destroyProductClass(id);
    res.status(201).send(deleteClass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// handler para actualizar clase de Producto
const putProductClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { productClass } = req.body;
    console.log(productClass);
    console.log(id);
    const updateClass = await updateProductClass(id, productClass);
    res.status(201).send(updateClass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllProductClasses,
  postProductClass,
  deleteProductClass,
  putProductClass,
};
