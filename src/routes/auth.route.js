import { Router } from "express";
import { login } from "../controllers/auth.controllers.js";
export const authRouter = Router();

authRouter.post("/auth", login)
