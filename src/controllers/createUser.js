const handlerCreateUser = require("../handlers/handlerCreateUser");

const createUser = async (req, res) => {
  try {
    const response = handlerCreateUser(req);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error });
  }
};
module.exports = createUser;
