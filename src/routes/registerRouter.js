const express = require("express");
const { User } = require("../db");

const router = express.Router();

router.post("/", async (req, res) => {
  const { uid, email, displayName } = req.body;
  const user = { id: uid, userName: displayName, email };

  try {
    const createdUser = await User.create(user);
    res.status(200).send(createdUser);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      // Si el usuario ya existe, puedes optar por enviar un mensaje personalizado
      res.status(400).send("El usuario ya existe.");
    } else {
      // Si el error es de otro tipo, devuelve un mensaje de error interno del servidor
      res.status(500).send("Error interno del servidor.");
    }
  }
});

module.exports = router;
