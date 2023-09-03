const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const userRouter = require("./userRouter");
const productClassRouter = require ("./productClassRouter")


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/users", userRouter);
router.use("/productClass", productClassRouter)

module.exports = router;
