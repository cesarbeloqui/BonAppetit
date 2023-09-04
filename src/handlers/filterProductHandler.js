const {
  filterProductByName,
  filterProductByClass,
  filterProductByStock,
  filterProductByEnabled,
} = require("../controllers/filterProductController");

//-----------------------------------------------------------------------------------

const getProductByName = async (req, res) => {
  const { name } = req.query;

  try {
    const matches = filterProductByName(name);

    if (matches.length > 0) {
      res.status(200).json(matches);
    } else {
      res.status(404).json({
        message: `No existe productos que coincida con el nombre ${name}`,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//-----------------------------------------------------------------------------------

const getProductByClass = async (req, res) => {
  const { className } = req.query;

  try {
    const matches = filterProductByClass(className);

    if (matches.length > 0) {
      res.status(200).json(matches);
    } else {
      res.status(404).json({
        message: `No existe productos dentro de la clase ${className}`,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//-----------------------------------------------------------------------------------

const getProductByStock = async (req, res) => {
  const { stock } = req.query;

  try {
    const matches = filterProductByStock(stock);

    if (stock === true && matches.length > 0) {
      return res.status(200).json(matches);
    }

    if (stock === true && matches.length === 0) {
      return res.status(404).json({ message: "No hay productos en stock" });
    }

    if (stock === false && matches.length > 0) {
      return res.status(200).json(matches);
    }

    if (stock === false && matches.length === 0) {
      return res.status(404).json({ message: "No hay productos sin stock" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//-----------------------------------------------------------------------------------

const getProductByEnabled = async (req, res) => {
  const { enable } = req.query;

  try {
    const matches = filterProductByEnabled(enable);

    if (enable === true && matches.length > 0) {
      return res.status(200).json(matches);
    }

    if (enable === true && matches.length === 0) {
      return res.status(404).json({ message: "No hay productos habilitados" });
    }

    if (enable === false && matches.length > 0) {
      return res.status(200).json(matches);
    }

    if (enable === false && matches.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay productos inhabilitados" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//-----------------------------------------------------------------------------------

module.exports = {
  getProductByName,
  getProductByClass,
  getProductByStock,
  getProductByEnabled,
};
