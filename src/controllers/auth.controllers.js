import bcrypt from "bcrypt"
import { loginService, generateTokenService } from "../services/auth.service.js"

export const login = async (req, res) => {
  const { email, password } = req.body
  const user = await loginService(email)
  if (!user) {
    return res.status(404).send({ message: "Invalid User or Password" })
  }
  const passwordIsValid = await bcrypt.compare(password, user.password)
  if (!passwordIsValid) {
    return res.status(400).send({ message: "Invalid User or Password" })
  }
  const token = generateTokenService(user.id)
  res.send({ token })
}

