const admin = require("firebase-admin");
const { mail_rover, accountTransport } = require("../config/mailer");


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
        subject: "Confirmación del correo electrónico",
        text: `Haz click en el siguiente enlace para confirmar tu correo electrónico: ${link} \n\n Si no creaste esta cuenta, puedes ignorar este mensaje`,
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

const handlerDeleteUser = async (email) => {
  try {
    // Encuentra al usuario por su correo electrónico
    const user = await admin.auth().getUserByEmail(email);

    if (!user) {
      throw new Error("No se encontró al usuario");
    }

    // Elimina al usuario
    await admin.auth().deleteUser(user.uid);

    return "Usuario eliminado con éxito";
  } catch (error) {
    throw new Error(`Error al eliminar usuario: ${error.message}`);
  }
};

const updateUserPassword = async (req, res) => {
  const { newPassword } = req.body;

  // Verifica que el usuario esté autenticado
  const user = req.user; // Firebase puede autenticar al usuario?
  try {
    // Actualiza la contraseña del usuario autenticado
    await admin.auth().updateUser(user.uid, { password: newPassword });
    res.status(200).json({ message: "Contraseña actualizada con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  handlerCreateUser,
  handlerDeleteUser,
  updateUserPassword
};

