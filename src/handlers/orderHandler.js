const {
  createOrder,
  filterOrder,
  orderPaid,
  changeStatus,
  removeOrder,
  findOrderById,
  } = require("../controllers/orderController");

const  {payment_notification
} = require("./../controllers/paymentController.js")
//-----------------------------------------------------------------------------------------

const postOrder = async (req, res) => {
  
  const { arrDetails, idUser, status, userEmail } = req.body;

  try {
    const addOrder = await createOrder(arrDetails, idUser , status, userEmail );
    if (addOrder) {
      res.status(200).json(addOrder);
    } else {
      res.status(404).json({
        message: "No se pudo generar el pedido",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//-----------------------------------------------------------------------------------------

const getOrderFilters = async (req, res) => {
  const { userId, status, payment_status } = req.query;
  const filterBy = { userId, status, payment_status };

  try {
    const matches = await filterOrder(filterBy);
    if (matches.length > 0) {
      res.status(200).json(matches);
    } else {
      res.status(404).json({
        message: "No hay pedidos que cumplan con los filtros aplicados",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//-----------------------------------------------------------------------------------------

const updateOrderPayment = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await orderPaid(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//-----------------------------------------------------------------------------------------

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await changeStatus(id, status);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//-----------------------------------------------------------------------------------------

const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    await removeOrder(id);
    res.status(200).json({
      message: "Orden borrada con exito!",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//-----------------------------------------------------------------------------------------
const webHookNotification = async (req, res) => {
  try {
    await payment_notification(req);
    res.status(200).send('notificacion recibida')
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrderById = async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await findOrderById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postOrder,
  getOrderFilters,
  updateOrderPayment,
  updateStatus,
  deleteOrder,
  webHookNotification,
  getOrderById
};
