const { User } = require("../db");

const disableUser = async (req, res) => {
  try {
  const { adminId, disable } = req.body;
  const { uid } = req.params;
    if (!adminId) {
      return res.status(400).json({ error: "El campo adminId es obligatorio en el cuerpo de la solicitud." });
    }
    const admin = await User.findByPk(adminId);
    if (!admin || admin.role !== "Admin") {
      throw new Error("Acceso denegado. Se requiere rol de administrador.");
    }
    const targetUser = await User.findByPk(uid);
    if (!targetUser) {
      throw new Error("El usuario no se puede inhabilitar.");
    }
    targetUser.disable = disable;
    await targetUser.save()
    return res.status(200).json({ message: "Usuario inhabilitado con éxito" });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {disableUser};

