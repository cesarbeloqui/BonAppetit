const handleVerifyToken = require("../handlers/handleVerifyToken");

const authController = async (req, res) => {
  const { token } = req.params;
  try {
    const response = await handleVerifyToken(token);
      res.status(200).send(response);
  } catch (error) {
    console.log(error.errorInfo);
    if (error.errorInfo.code) {
      res.status(400).send({ error: "Debe iniciar sesión de nuevo" });
    } else {
      res.status(500).send(error);
    }
  }
};

module.exports = authController;

