const { time } = require('console')
const { Product , ProductClass } = require ('../db')



const findAllProduct = async () => {
  const product = await Product.findAll({
    where: { deleted: false },
    order: ["id"],
    include: {
      model: ProductClass,
      attributes: ["class", "image"],
      through: {
        attributes: [],
      },
    },
  });
  return product;
};

const createProduct = async ({name,price,image,stock,enable,productClass,description,time}) => {
    console.log(name,price,image,productClass)
    if (!name || !price || !image || productClass || time)  {  ('faltan datos para crear producto')}
    if ((await ProductClass.findAll()).length<1) { return ('debe cargar clases de comida antes de agregar productos')} 
    const newProduct = await Product.create({
        name,
        price,
        image,
        stock,
        enable,
        time,
        description
        })
    newProduct.addProductClasses(productClass)
   
    return newProduct
}

// ruta para borrar un prod
const destroyProduct = async (id) => {
  const product = await Product.findByPk(id);
  if (!product.id) {
    return "no hay nada para borrar";
  }
  if (product.deleted) {
    return "este producto ya estaba borrado";
  }
  Product.update({ deleted: true }, { where: { id: id } });
  return "producto borrado";
};

const recoverProduct = async (id) => {
  const product = await Product.findByPk(id);
  if (!product.id) {
    return "id de producto incorrecto";
  }
  console.log(product.deleted);
  if (product.deleted === false) {
    return "este producto no esta borrado";
  }
  Product.update({ deleted: false }, { where: { id: id } });
  return "producto recuperado";
};

const updateProduct = async (id, product) => {
  await Product.update(product, { where: { id: id } });
  const updateProduct = Product.findByPk(id);
  return updateProduct;
};

const findProductDetailById = async (id) => {
  try {
    const productId = parseInt(id, 10);
    
    const productDetail = await Product.findByPk(productId);
    return productDetail;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createProduct,
  findAllProduct,
  destroyProduct,
  updateProduct,
  recoverProduct,
  findProductDetailById
};
