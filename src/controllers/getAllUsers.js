const { User } = require("../db");

const getAllUsers = async (_req, res) => {
  try {
    const users = await User.findAll();
    users.length === 0
      ? res
          .status(404)
          .json({ error: "No hay usuarios cargados en la base de datos" })
      : res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAllUsers;
