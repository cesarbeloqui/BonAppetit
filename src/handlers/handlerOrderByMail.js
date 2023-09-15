const { getOrderByEmail } = require("../controllers/getOrderByMail"); 

const handlerOrderByMail = async (req, res) => {
    const userEmail = req.params.email;
    try {
      const orders = await getOrderByEmail(userEmail);
      if (!orders || orders.length === 0) {
        return res.status(404).json({ error: 'Pedidos no encontrados' });
      }
      res.status(200).json(orders);
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  module.exports = {
    handlerOrderByMail
  }
  