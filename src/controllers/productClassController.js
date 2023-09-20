const { ProductClass } = require("../db");

const findAllProductClasses = async () => {
  const classes = await ProductClass.findAll();
  return classes;
};

//-------------------------------
const productClassArray = [];

const addProductClass = (productClass) => {
  productClassArray.push(productClass);
};
const getProductClass = () => {
  return productClassArray;
};

const initializeProductClassesArray = async () => {
  try {
    const classesFromDatabase = await findAllProductClasses();
    productClassArray.push(...classesFromDatabase);
  } catch (error) {
    console.error('Error al obtener las clases de productos desde la base de datos:', error);
  }
}

const createProductClass = async (productClass, image) => {
  console.log(image);
  const newClass = await ProductClass.create({
    class: productClass,
    image: image,
  });
  return newClass;
  };

//--------------------------------------------------------------------
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
  await ProductClass.update(productClass, { where: { id: id } });
  const updateClass = ProductClass.findByPk(id);
  return updateClass;
};

module.exports = {
  findAllProductClasses,
  createProductClass,
  destroyProductClass,
  updateProductClass,
  addProductClass,
  getProductClass,
  initializeProductClassesArray
};
