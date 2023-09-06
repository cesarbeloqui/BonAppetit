const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// ruta para authenticar usuarios
router.get("/action", authController);

module.exports = router;
