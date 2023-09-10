const convertirMinutosATiempo = require("../utils/convertirMinutosATiempo");
const { Product, ProductClass } = require("../db");
const data = require("../data");

const loadingFamilyAndProduct = async () => {
  // Paso 1: Insertar las ProductClass
  await ProductClass.bulkCreate(
    data.map((familia) => ({
      class: familia.familyName,
      image: familia.familyImage,
    }))
  );
  // Paso 2: Obtener las ProductClass creadas
  const productClasses = await ProductClass.findAll();
  // Paso 2: Asociar los Productos con las ProductClass
  for (const familia of data) {
    const productClass = productClasses.find(
      (pc) => pc.class === familia.familyName
    );

    for (const receta of familia.recipes) {
      const newProduct = await Product.create({
        name: receta.name,
        price: receta.price,
        image: receta.image,
        stock: receta.stock,
        time: convertirMinutosATiempo(receta.time),
        description: receta.desc,
      });
      await newProduct.addProductClasses(productClass.id);
    }
  }
};

module.exports = loadingFamilyAndProduct;
