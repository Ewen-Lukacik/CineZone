import { Router } from "express";
import { createUser, login } from "../Controller/userController.js";
import validateUser, { checkEmailNotTaken, hashPassword } from "../Middlewares/userValidator.js";
import { validateLogin } from "../Middlewares/validateLogin.js";

const userRouter = Router();

userRouter.post('/', validateUser, checkEmailNotTaken, hashPassword, createUser);
userRouter.post('/login', validateLogin, login);

export default userRouter;