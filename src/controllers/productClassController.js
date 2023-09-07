const { ProductClass } = require("../db");

const findAllProductClasses = async () => {
  const classes = await ProductClass.findAll();
  return classes;
};

const createProductClass = async (productClass,image) => {
  console.log(image)
  const newClass = await ProductClass.create({
    class: productClass,
    image: image
  });
  return newClass;
};

const destroyProductClass = async (id) => {
  const productClass = await ProductClass.findByPk(id);
  if (productClass) {
    productClass.destroy();
    return "clase de producto borrada con exito";
  } else {
    return "no hay nada para borrar";
  }
};

const updateProductClass = async (id, productClass) => {
  await ProductClass.update(
    productClass,
    { where: { Id: id } }
  );
  const updateClass = ProductClass.findByPk(id);
  return updateClass;
};

module.exports = {
  findAllProductClasses,
  createProductClass,
  destroyProductClass,
  updateProductClass,
};