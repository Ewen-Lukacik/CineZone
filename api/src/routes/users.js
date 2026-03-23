import { Router } from "express";
import { createUser, getMe, login } from "../Controller/userController.js";
import { requireAuth } from "../Middlewares/requireAuth.js";
import validateUser, { checkEmailNotTaken, hashPassword } from "../Middlewares/userValidator.js";
import { validateLogin } from "../Middlewares/validateLogin.js";

const userRouter = Router();

userRouter.post('/', validateUser, checkEmailNotTaken, hashPassword, createUser);
userRouter.post('/login', validateLogin, login);
userRouter.get('/me', requireAuth, getMe)

export default userRouter;