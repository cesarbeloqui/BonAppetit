const express = require("express");
const router = express.Router();
const {
  postOrder,
  getOrderFilters,
  updateOrderPayment,
  updateStatus,
  deleteOrder,
} = require("../handlers/orderHandler");

//-----------------------------------------------------------------------------------------

/*ruta para crear orden, recibe un array de objetos con cada detalle de orden y el id del usuario
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
Le pasamos por params el id del pedido que se pagó
*/
router.put("/paying/:id", updateOrderPayment);

//-----------------------------------------------------------------------------------------

/*ruta para el cambio de estado de orden
Le pasamos por params el id del pedido que le queramos cambiar el estado de orden
y por body le pasamos el nuevo estado de orden, estas son las opciones:
>Pagar
>En_preparacion
>Para_entregar
>Entregado
>Cancelado
 */
router.put("/status/:id", updateStatus);

//-----------------------------------------------------------------------------------------

/*ruta para borrar la orden
Le pasamos ppor params el id
*/
router.delete("/delete/:id", deleteOrder);

//-----------------------------------------------------------------------------------------

module.exports = router;
