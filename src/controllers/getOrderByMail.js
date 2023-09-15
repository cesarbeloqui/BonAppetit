const { Order, OrderDetail, Product } = require("../db");

const getOrderByEmail = async (userEmail) => {
    try{
        const orders = await Order.findAll({
          where: { userEmail },
          include: {
            model: OrderDetail,
            include: [Product],
          },
        });
        return orders;
    }catch(error){
        console.error("Error en controller", error); 
        throw error;
    }
};

module.exports = {
    getOrderByEmail
}
  