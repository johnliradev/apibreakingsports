import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { findUserByIdService } from "../services/user.service.js"
dotenv.config()


export const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) {
      return res.sendStatus(401)
    }

    const parts = authorization.split(" ")
    if (parts.length !== 2) {
      return res.sendStatus(401)
    }

    const [schema, token] = parts
    if (schema !== "bearer") {
      return res.sendStatus(401)
    }

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: "Invalid Token" })
      }
      const user = await findUserByIdService(decoded.id)
      if (!user || !user.id) {
        res.status(400).send({ message: "Invalid Token" })
      }
      req.userId = user._id
      return next()
    })
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }

}
