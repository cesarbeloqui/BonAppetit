const { Router } = require("express");
const { createUser, deleteUser } = require("../controllers/createUser");
const { changePasswordUser } = require("../handlers/handlerCreateUser");
const getUserById = require("../controllers/getUserById");
const getAllUsers = require("../controllers/getAllUsers");
const changeTypeUser = require("../controllers/changeTypeUser");

const userRouter = Router();

userRouter.get("/:id", getUserById);
userRouter.get("/", getAllUsers);
userRouter.post("/create", createUser);

userRouter.delete("/delete", deleteUser);

userRouter.put("/put", changePasswordUser);
userRouter.post("/update", changeTypeUser);

module.exports = userRouter;
