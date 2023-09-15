const admin = require("firebase-admin");
const { mail_rover, accountTransport } = require("../config/mailer");
const URL_FRONT = process.env.URL_FRONT;
const { User } = require("../db");

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
    // Genera el token de inicio de sesión
    const userToken = await admin.auth().createCustomToken(userRecord.uid);
    const createUserInDB = await User.create({
      id: userRecord.uid,
      displayName: userRecord.displayName,
      email: userRecord.email,
    });
    // Envía el correo de verificación después de crear el usuario
    if (createUserInDB) {
      const actionCodeSettings = {
        url: `${URL_FRONT}`,
        handleCodeInApp: true,
      };

      const link = await admin
        .auth()
        .generateEmailVerificationLink(userRecord.email, actionCodeSettings);
      const mail = await mail_rover(async (transporter) => {
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

      return { userRecord, link, userToken };
    } else {
      throw new Error("Error al registrar el usuario");
    }
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

const sendCustomPasswordResetEmail = async (email, link) => {
  // Configura el correo electrónico
  mail_rover(async (transporter) => {
    const mailOptions = {
      from: `${accountTransport.auth.user}`, // Cambia esto a tu dirección de correo
      to: `${email}`, // Cambia esto al destinatario deseado
      subject: "Cambio de contraseña",
      text: `Haz click en el siguiente enlace para cambiar tu contraseña: ${link} \n\n Si no solicitaste el cambio, puedes ignorar este mensaje`,
    };
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Correo enviado:", info.response);
    } catch (err) {
      console.error("Error al enviar el correo:", err);
    }
  });
};

const changePasswordUser = async (req) => {
  const { email } = req.body;
  console.log("Valor de email:", email);
  try {
    const userEmail = await admin.auth().getUserByEmail(email);
    const actionCodeSettings = {
      url: `${URL_FRONT}`, // URL de tu aplicación para restablecer la contraseña
      handleCodeInApp: true, //Firebase manejara el restablecimiento de la contraseña
    };
    // console.log("valor de userEmail", userEmail);
    const link = await admin
      .auth()
      .generatePasswordResetLink(userEmail.email, actionCodeSettings);
    await sendCustomPasswordResetEmail(userEmail.email, link);
    return {
      message: "Correo de restablecimiento de contraseña enviado con éxito",
    };
  } catch (error) {
    throw new Error(
      `Error al enviar correo de cambio de contraseña: ${error.message}`
    );
  }
};

module.exports = {
  handlerCreateUser,
  handlerDeleteUser,
  changePasswordUser,
};
