import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { loginSchema, registerSchema } from '../validation/userValidation.js'
import {
  registerUser,
  loginUser,
} from '../controller/authController.js'

const authRouter = Router()

authRouter.post('/login', validate(loginSchema), loginUser)
authRouter.post('/register', validate(registerSchema), registerUser)

export { authRouter }