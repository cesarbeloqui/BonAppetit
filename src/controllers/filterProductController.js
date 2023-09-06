const { Product } = require("../db");

const filterProduct = async (filterBy) => {
  const filter = {
    where: {},
  };

  if (filterBy.name) {
    filter.where.name = { [Op.iLike]: `%${filterBy.name}%` };
    filter.where.include = {
      model: Class,
      attributes: ["name"],
      through: { attributes: [] },
    };
  }

  if (filterBy.className) {
    filter.where.class = filterBy.className;
  }

  if (filterBy.stock) {
    filter.where.stock = filterBy.stock;
  }

  if (filterBy.enable) {
    filter.where.enable = filterBy.enable;
  }

  return await Product.findAll(filter);
};

module.exports = filterProduct;
