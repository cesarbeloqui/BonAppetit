const { Product, ProductClass } = require("../db");
const { Op } = require("sequelize");

const filterProduct = async (filterBy) => {
  let where = {};
  let include = {};

  if (filterBy.name) {
    where.name = { [Op.iLike]: `%${filterBy.name}%` };
  }

  if (filterBy.className) {
    include = [
      {
        model: ProductClass,
        where: { class: filterBy.className },
        attributes: ["class"],
        through: {
          attributes: [],
        },
      },
    ];
  } else {
    include = {
      model: ProductClass,
      attributes: ["class"],
      through: {
        attributes: [],
      },
    };
  }

  if (filterBy.stock) {
    where.stock = { [Op.lte]: filterBy.stock };
  }

  if (filterBy.enable) {
    where.enable = filterBy.enable;
  }

  if (filterBy.price) {
    where.price = { [Op.lte]: filterBy.price };
  }

  if (filterBy.qualification) {
    where.qualification = filterBy.qualification;
  }

  if (filterBy.deleted) {
    where.deleted = filterBy.deleted;
  }

  const filteredProducts = await Product.findAll({
    where: where,
    include: include,
  });

  return filteredProducts;
};

module.exports = filterProduct;
