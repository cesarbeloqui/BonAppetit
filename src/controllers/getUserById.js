const handlerGetUserById = require("../handlers/handlerGetUserById");
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await handlerGetUserById(id);
    user == null
      ? res.status(404).send("Usuario no encontrado")
      : res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = getUserById;
