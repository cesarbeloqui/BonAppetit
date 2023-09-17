const {
  createProduct,
  findAllProduct,
  findProduct,
  destroyProduct,
  recoverProduct,
  updateProduct,
} = require("../controllers/product.js");
const { Product, ProductClass } = require("../db");
const { Op } = require("sequelize");

//trae todos los productos
const getAllProduct = async (req, res) => {
  try {
    const productClass = await findAllProduct();
    res.status(200).json(productClass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//ruta del detalle del pedido
const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await findProduct(id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// para crear un producto
const postProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      image,
      stock,
      enable,
      productClass,
      description,
      time,
      qualification,
    } = req.body;
    if (!name || !price || !image || !productClass || !time) {
      return res
        .status(404)
        .json({ error: "faltan datos para crear producto" });
    }

    const classesExists = await ProductClass.findAll();

    if (classesExists.length === 0) {
      return res.status(404).json({
        error: "debe cargar clases de comida antes de agregar productos",
      });
    }

    const filteredProducts = await Product.findOne({
      where: { name: name },
    });
    const filteredClass = await ProductClass.findOne({
      where: { class: productClass },
    });
    const {id} = filteredClass

    if (filteredProducts) {
      return res.status(404).json({
        error: `El producto ${name} ya existe`,
      });
    } else {
      const product = {
        name,
        price,
        image,
        stock,
        enable,
        productClass: id,
        description,
        time,
        qualification,
      };
      const newProduct = await createProduct(product);
      res.status(201).json(newProduct);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  para borrar   ( borrado logico )

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { deleted } = req.query;
    const delProduct = await destroyProduct(id, deleted);
    res.status(201).send(delProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ruta para recuperar o editar producto
const putProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { deleted } = req.query;
    const product = req.body;

    if (deleted === "false") {
      const recover = await recoverProduct(id, deleted);
      res.send(recover);
    } else {
      const update = await updateProduct(id, product);
      res.send(update);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllProduct,
  getProduct,
  putProduct,
  deleteProduct,
  postProduct,
};
