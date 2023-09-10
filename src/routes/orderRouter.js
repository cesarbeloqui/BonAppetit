const express = require("express");
const router = express.Router();
const {
  postOrder,
  getOrderFilters,
  updateOrderPayment,
  updateStatus,
  deleteOrder,
  getOrderById
} = require("../handlers/orderHandler");

//-----------------------------------------------------------------------------------------

/*ruta para crear orden, recibe un array de objetos con cada detalle de orden (id 
  del producto, precio unitario del producto, cantidad que quiero de ese producto 
  y extras que es un string de especificaciones) ) y el id del usuario
Por ejemplo:
{
  arrDetails: [{"idProduct": 1, "price": 20, "amount": 2, "extras": "Sin queso"}, 
              {"idProduct": 2, "price": 20, "amount": 3, "extras": "Con doble queso"}],
  idUser: idDelUsuario
}
*/
router.post("/", postOrder);

//-----------------------------------------------------------------------------------------

/*ruta para filtrar por estado de orden, por id o por estado de pago

?status=ENUM
El filtrado es sobre un enum, por ende estas son sus opciones:
>Pagar
>En_preparacion
>Para_entregar
>Entregado
>Cancelado

?userId=idDelUsuario

?payment_status=boolean
true los que estan pagos, false los que faltan pagar

TODOS LOS FILTROS SON COMBINABLES
ejemplo: ?userId=1&status=En_preparacion
*/
router.get("/", getOrderFilters);

//-----------------------------------------------------------------------------------------

/*ruta para el cambio de estado de pago, por default no esta pagado.
Por default no esta pagado. Le pasamos por params el id del pedido que se pagó y automaticamente el 
estado de pedido cambiara a "En_preparacion" y el stock de los productos decrementará segun el pedido realizado.
*/
router.put("/paying/:id", updateOrderPayment);

//-----------------------------------------------------------------------------------------

/*ruta para el cambio de estado de orden
Le pasamos por params el id del pedido que le queramos cambiar el estado de orden
y por body le pasamos el nuevo estado de orden:

Por default esta "Pagar"
>Para_entregar
>Entregado
>Cancelado

¡¡¡LA IDEA ES QUE SI PAGAN EL PEDIDO, UTILICEN LA RUTA DE ARRIBA, Y ESTA LA USEN SOLO PARA ESTOS 3 ESTADOS INDICADOS ARRIBA!!!
 */
router.put("/status/:id", updateStatus);

//-----------------------------------------------------------------------------------------

/*ruta para borrar la orden
Le pasamos por params el id del producto que queramos borrar
*/
router.delete("/delete/:id", deleteOrder);

//-----------------------------------------------------------------------------------------

router.get("/:id", getOrderById);

module.exports = router;
