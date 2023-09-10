const mercadopago = require("mercadopago");

// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
mercadopago.configure({
	access_token: "TEST-364800963197721-090915-6a620697a31e5836a9edf4a9a6fbbde6-1474242935",
});


const payment = async ( total ) => {

	// status: created  ---> payfull ---> delivered         -----> canceled

	let preference = {
		items: [
			{
				title: "Bon Appetit",
				unit_price: total,
				quantity: 1,
			}
		],
		back_urls: {
			"success": "http://localhost:3000/success",
			"failure": "http://localhost:3000/error",
			
		},
		//notification_url: "https://4dd6-190-188-94-132.ngrok-free.app/webhook",
		auto_return: "approved",
	};

	const link  = await mercadopago.preferences.create(preference)

	return link.body.init_point
   
};
// app.post('/webhook',  async ( req, res) => {
// 	console.log(req.body)
// 	const {}
// 	if (req.body.action === 'payment.created' && req.body.data) {
// 		console.log('entro el pago', req.body.data)
// 		buscar en base de datos el id 
// 		cambiar estado de created por el nuevo estado de pagado
// 		cuando se entregue la comida pasara al ultimo estado final, que es delivered.
// 	}

// 	let body = ""; 
// 	req.on("data", chunk => {  
// 		body += chunk.toString();
// 	});
// 	req.on("end", () => {  
// 		console.log(body, "webhook response"); 
// 		res.end("ok");
// 	});

// 	  return res.status(200); 
    
// 	const payment = req.query
    
//     console.log(payment)
//     try {
//         res.status(200);
//     } catch (error) {
        
//         return res.status(500).Json( {error: error.message});
//     }
// })

// app.get('/feedback', function (req, res) {
// 	res.json({
// 		Payment: req.query.payment_id,
// 		Status: req.query.status,
// 		MerchantOrder: req.query.merchant_order_id
// 	});
// });

module.exports = {payment}
