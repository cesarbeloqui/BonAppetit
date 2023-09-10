const handleVerifyEmail = require("../handlers/handleVerifyEmail");

const authController = (req, res) => {
  try {
    res
      .status(200)
      .send("Hola este va a ser el link de redireccionamiento a la app");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = authController;
