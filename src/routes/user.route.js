import express from "express";
import {
  create,
  findAllUsers,
  findUserById,
  updateUser
} from "../controllers/user.controllers.js";
import { validId, validUser } from "../middlewares/global.middlewares.js";
export const userRouter = express.Router();

userRouter.post("/user", create);
userRouter.get("/user", findAllUsers);
userRouter.get("/user/:id", validId, validUser, findUserById);
userRouter.patch("/user/:id", validId, validUser, updateUser)

