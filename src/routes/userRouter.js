const { Router } = require("express");
const createUser = require("../controllers/createUser");

const userRouter = Router();

userRouter.post("/create", createUser);

module.exports = userRouter;
