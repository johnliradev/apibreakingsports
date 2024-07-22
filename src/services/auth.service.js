import { User } from "../models/User.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const secretJWT = process.env.SECRET_JWT
export const loginService = (email) => User.findOne({ email: email }).select("+password")
export const generateTokenService = (id) => jwt.sign({ id: id }, secretJWT, { expiresIn: 3600 })

