const { handlerCreateUser, handlerDeleteUser } = require("../handlers/handlerCreateUser");


const createUser = async (req, res) => {
  try {
    const { userRecord, link } = await handlerCreateUser(req);
    // Aquí puedes usar un servicio de envío de correo electrónico (como SendGrid o Nodemailer)
    // para enviar el enlace de verificación al correo del usuario
    console.log("Enlace de verificación:", link);
    // En este ejemplo, simplemente se muestra el enlace en la consola
    // Debes enviarlo por correo electrónico al usuario
    res.status(200).json({
      user: userRecord,
      message: "Usuario creado y correo de verificación enviado.",
    });
  } catch (error) {
    // Verifica si el error es debido a un correo electrónico duplicado
    if (
      error.message ===
      "The email address is already in use by another account."
    ) {
      res
        .status(400)
        .json({ error: "El correo electrónico ya está registrado." });
    } else if (
      error.message === "La contraseña debe tener al menos 6 caracteres."
    ) {
      res
        .status(400)
        .json({ error: "La contraseña debe tener al menos 6 caracteres." });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};




const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "El correo electrónico es requerido" });
    }

    const result = await handlerDeleteUser(email);
    return res.status(200).json({ message: result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};






module.exports = {
  createUser,
  deleteUser
};