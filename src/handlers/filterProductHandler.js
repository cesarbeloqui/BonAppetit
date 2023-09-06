const filterProduct = require("../controllers/filterProductController");

const getFilterProduct = async (req, res) => {
  const { name, className, stock, enable } = req.query;
  const filterBy = { name, className, stock, enable };

  try {
    const matches = filterProduct(filterBy);
    if (matches.length > 0) {
      res.status(200).json(matches);
    } else {
      res.status(404).json({
        message: "No existe producto que coincida con tu busqueda",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getFilterProduct;
