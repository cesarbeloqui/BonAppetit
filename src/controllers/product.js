const { Product, ProductClass } = require("../db");

const findAllProduct = async () => {
  const product = await Product.findAll({
    where: { deleted: false },
    order: ["id"],
    include: {
      model: ProductClass,
      attributes: ["id", "class", "image"],
      through: {
        attributes: [],
      },
    },
  });
  return product;
};

const findProduct = async (id) => {
  const productDetail = await Product.findByPk(id);
  return productDetail;
};

const createProduct = async ({
  name,
  price,
  image,
  stock,
  enable,
  productClass,
  description,
  time,
}) => {
  const newProduct = await Product.create({
    name,
    price,
    image,
    stock,
    enable,
    time,
    description,
  });
  newProduct.addProductClasses(productClass);

  return newProduct;
};

// ruta para borrar un prod
const destroyProduct = async (id) => {
  const product = await Product.findByPk(id);
  if (!product.id) {
    return "No hay nada para borrar";
  }
  if (product.deleted) {
    return "Este producto ya estaba borrado";
  }
  Product.update({ deleted: true }, { where: { id: id } });
  return "Producto borrado";
};

const recoverProduct = async (id) => {
  const product = await Product.findByPk(id);
  if (!product.id) {
    return "Id de producto incorrecto";
  }
  console.log(product.deleted);
  if (product.deleted === false) {
    return "Este producto no esta borrado";
  }
  Product.update({ deleted: false }, { where: { id: id } });
  return "Producto recuperado";
};

const updateProduct = async (id, product) => {
  await Product.update(product, { where: { id: id } });
  const updateProduct = Product.findByPk(id);
  return updateProduct;
};
const enableProduct = async (id) => {
  const product = await Product.findByPk(id);
  if (!product.id) {
    return "Id de producto incorrecto";
  }
  Product.update({ enable: true }, { where: { id: id } });
  return "Producto habilitado";
};

const disableProduct = async (id) => {
  const product = await Product.findByPk(id);
  if (!product.id) {
    return "Id de producto incorrecto";
  }
  Product.update({ enable: false }, { where: { id: id } });
  return "Producto deshabilitado";
};

module.exports = {
  createProduct,
  findAllProduct,
  findProduct,
  destroyProduct,
  updateProduct,
  recoverProduct,
  enableProduct,
  disableProduct,
};
