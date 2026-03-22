import { Router } from "express";
import { createUser, login } from "../Controller/userController.js";
import hashPassword, { checkEmailNotTaken, validateUser } from "../Middlewares/userValidator.js";
import { validateLogin } from "../Middlewares/validateLogin.js";

const userRouter = Router();

userRouter.post('/', validateUser, checkEmailNotTaken, hashPassword, createUser);


export default userRouter;