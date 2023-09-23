const {
  qualifyProduct,
  qualificationComment
} = require("../controllers/qualificationController.js");

const postQualification = async (req, res) => {
  const { arrQualification } = req.body;

  try {
    if (arrQualification.length > 0) {
      await qualifyProduct(arrQualification);
      return res.status(200).json({
        message: "Tus calificaciones fueron recibidas correctamente",
      });
    } else {
      return res.status(404).json({ message: "No recibimos calificaciones" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getQualification = async (req, res) => {
  try {
    const {idProduct} = req.query
    const comment = await qualificationComment(idProduct);
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = { postQualification , getQualification };
