const mercadopago = require("mercadopago");
const { URL_SUCCESS, URL_FAILURE , URL_NOTIFICATION , MP_TOKEN } = process.env;
const axios = require ('axios');
const { Order } = require("../db");


// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
mercadopago.configure({
	access_token: MP_TOKEN,
});


const payment = async ( total , idpedido) => {
	
	let preference = {
		items: [
			{
				id: idpedido,
				title: "Bon Appetit",
				unit_price: total,
				quantity: 1,
			}
		],
		back_urls: {
			"success": `${URL_SUCCESS}`,
			"failure": `${URL_FAILURE}`,
			
		},
		metadata: { 
            payment_id: idpedido
         },

        notification_url:`${URL_NOTIFICATION}/order/webhook`,
		auto_return: "approved",
        
	};

	const link  = await mercadopago.preferences.create(preference)
 	
	return link.body.init_point
  
};
const payment_notification = async  ( req ) => {
	const notification =  req.body;
	if ( notification.data && notification.type=== 'payment'){
		const respWebHook = notification.data.id
		const config = {
			headers: { Authorization: `Bearer ${MP_TOKEN}` }
		};
		const recoverPayment = await axios.get(`https://api.mercadopago.com/v1/payments/${respWebHook}`, config)
		.then((response) => response.data)
		.catch((error) => new Error(error))
		if(recoverPayment.status==='approved'){
			const orderId= recoverPayment.metadata.payment_id
			await Order.update({
				status: "En_preparacion",
				payment_status: true,
			},{ 
				where : 
				{
					id: orderId
				}
			})
		}
	}
}

module.exports = {payment , payment_notification}
