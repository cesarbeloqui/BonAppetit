const { Router } = require('express');
const path = require('path');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const registerRouter = require('./registerRouter');
const userRouter = require('./userRouter');
const productClassRouter = require('./productClassRouter');
const productRouter = require('./productRouter');
const authRouter = require('./authRouter');
const orderRouter = require('./orderRouter');
const qualificationRouter = require('./qualificationRouter');
const statisticsRouter = require('./statisticsRouter.js');
const notificationRouter = require('./notificationRouter');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/users', userRouter);

router.use('/productClass', productClassRouter);
router.use('/product', productRouter);
router.use('/auth', authRouter);
router.use('/register', registerRouter);
router.use('/order', orderRouter);
router.use('/qualification', qualificationRouter);
router.use('/statistics', statisticsRouter);
router.use('/notification', notificationRouter);

module.exports = router;
