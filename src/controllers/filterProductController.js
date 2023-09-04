const { Product } = require("../db");

//Filtro los productos que en su titulo contengan la query(con iLike no importa si esta en may o min).
const filterProductByName = async (name) => {
  const filtered = await Product.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
    include: {
      model: Class,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });
  return filtered;
};

//Filtro por clase(tipo) de producto.
const filterProductByClass = async (className) => {
  const filtered = await Product.findAll({ where: { class: className } });
  return filtered;
};

//Filtro de stock de productos(true si esta en stock, false si no lo esta)
const filterProductByStock = async (boolean) => {
  const filtered = await Product.findAll({ where: { stock: boolean } });
  return filtered;
};

//Filtro por productos habilitados(true si esta habilitado, false si no lo esta)
const filterProductByEnabled = async (boolean) => {
  const filtered = await Product.findAll({ where: { enable: boolean } });
  return filtered;
};

module.exports = {
  filterProductByName,
  filterProductByClass,
  filterProductByStock,
  filterProductByEnabled,
};
