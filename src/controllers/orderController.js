const { Product, OrderDetail, Order } = require("../db");

//-----------------------------------------------------------------------------------------

const createOrder = async (arrOrderDetail, idUser) => {
  let totalPrice = 0;

  const sumPrice = await arrOrderDetail.map(async (product) => {
    totalPrice += product.price * product.amount;
  });

  const newOrder = await Order.create({ total: totalPrice, UserId: idUser });

  await arrOrderDetail.forEach(async (product) => {
    const productExists = await Product.findByPk(product.idProduct);

    if (productExists) {
      await OrderDetail.create({
        ProductId: product.idProduct,
        price: product.price,
        amount: product.amount,
        extras: product.extras,
        OrderId: newOrder.id,
      });
    }
  });

  return newOrder;
};

//-----------------------------------------------------------------------------------------

const filterOrder = async (filterBy) => {
  let where = {};

  if (filterBy.userId) {
    where.UserId = filterBy.userId;
  }

  if (filterBy.status) {
    where.status = filterBy.status;
  }

  if (filterBy.payment_status) {
    where.payment_status = filterBy.payment_status;
  }

  const filteredProducts = await Order.findAll({
    where: where,
    include: {
      model: OrderDetail,
    },
  });

  return filteredProducts;
};

//-----------------------------------------------------------------------------------------

const orderPaid = async (id) => {
  await Order.update({ payment_status: true }, { where: { id: id } });
  const order = await Order.findByPk(id);
  return order;
};

//-----------------------------------------------------------------------------------------

const changeStatus = async (id, status) => {
  await Order.update({ status: status }, { where: { id: id } });
  const order = await Order.findByPk(id);
  return order;
};

//-----------------------------------------------------------------------------------------

const removeOrder = async (id) => {
  return await Order.destroy({
    where: {
      id: 1,
    },
  });
};

//-----------------------------------------------------------------------------------------

module.exports = {
  createOrder,
  filterOrder,
  orderPaid,
  changeStatus,
  removeOrder,
};
