const { Router } = require("express");
const {createUser, deleteUser} = require("../controllers/createUser");


const userRouter = Router();

userRouter.post("/create", createUser);

userRouter.delete("/delete", deleteUser);


module.exports = userRouter;
