const accountTransport = require("../account_transport.json");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

/* 
Esta es la posible respuesta de Firebase para un usuario nuevo
{
	"uid": "4rBSpg404eXssGuvAZNx3cyrFrq1",
	"email": "beloqui.cesar@gmail.com",
	"emailVerified": false,
	"displayName": "Cesar",
	"disabled": false,
	"metadata": {
		"lastSignInTime": null,
		"creationTime": "Sun, 03 Sep 2023 01:59:49 GMT",
		"lastRefreshTime": null
	},
	"tokensValidAfterTime": "Sun, 03 Sep 2023 01:59:49 GMT",
	"providerData": [
		{
			"uid": "beloqui.cesar@gmail.com",
			"displayName": "Cesar",
			"email": "beloqui.cesar@gmail.com",
			"providerId": "password"
		}
	]
}

*/

const handlerCreateUser = async (req) => {
  const { email, password, displayName } = req.body;

  const mail_rover = async (callback) => {
    const oauth2Client = new OAuth2(
      accountTransport.auth.clientId,
      accountTransport.auth.clientSecret,
      "https://developers.google.com/oauthplayground"
    );
    oauth2Client.setCredentials({
      refresh_token: accountTransport.auth.refreshToken,
      tls: {
        rejectUnauthorized: false,
      },
    });
    oauth2Client.getAccessToken((err, token) => {
      if (err) return console.log(err);
      accountTransport.auth.accessToken = token;
      callback(nodemailer.createTransport(accountTransport));
    });
  };
  // Verifica que la contraseña cumpla con los requisitos mínimos
  if (password.length < 6) {
    throw new Error("La contraseña debe tener al menos 6 caracteres.");
  }

  try {
    // Si el correo electrónico no está en uso, crea el usuario
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
    });
    // Envía el correo de verificación después de crear el usuario
    const link = await admin
      .auth()
      .generateEmailVerificationLink(userRecord.email);
    mail_rover(async (transporter) => {
      const mailOptions = {
        from: `${accountTransport.auth.user}`, // Cambia esto a tu dirección de correo
        to: `${email}`, // Cambia esto al destinatario deseado
        subject: "Asunto del correo",
        text: "Cuerpo del correo electrónico",
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Correo enviado:", info.response);
      } catch (err) {
        console.error("Error al enviar el correo:", err);
      }
    });

    return { userRecord, link };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = handlerCreateUser;
