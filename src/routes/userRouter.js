const { Router } = require("express");
const { createUser, deleteUser } = require("../controllers/createUser");
const { changePasswordUser } = require("../handlers/handlerCreateUser");
const getUserById = require("../controllers/getUserById");
const getAllUsers = require("../controllers/getAllUsers");
const changeTypeUser = require("../controllers/changeTypeUser");
const getAllUsersAdmins = require("../controllers/getAllUsersAdmins.js");
const getAllUsersClients = require("../controllers/getAllUsersClients.js");

const userRouter = Router();

userRouter.get("/clients", getAllUsersClients);
userRouter.get("/admins", getAllUsersAdmins);
userRouter.get("/:id", getUserById);
userRouter.get("/", getAllUsers);
userRouter.post("/create", createUser);

userRouter.delete("/delete", deleteUser);

userRouter.put("/put", changePasswordUser);
userRouter.post("/update", changeTypeUser);

module.exports = userRouter;
