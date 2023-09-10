const { User } = require("../db");

const getAllUsersClients = async (_req, res) => {
  try {
    res.status(200).json(await User.findAll({ where: { role: "Client" } }));
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports = getAllUsersClients;
