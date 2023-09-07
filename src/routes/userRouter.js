const { Router } = require("express");
const {createUser, deleteUser } = require("../controllers/createUser");
const { updateUserPassword } = require("../handlers/handlerCreateUser");


const userRouter = Router();

userRouter.post("/create", createUser);

userRouter.delete("/delete", deleteUser);

userRouter.put("/put", updateUserPassword)

module.exports = userRouter;
