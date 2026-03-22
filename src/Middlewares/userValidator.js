import bcrypt from "bcrypt";
import { body } from "express-validator";
import database from "../database.js";
import handleValidationErrors from "./handleValidationErrors.js";

export async function checkEmailNotTaken(req, res, next) {
 try {
    const { email } = req.body;

    const [users] = await database.query(
"SELECT id FROM users WHERE email = ?", [email]);

    if (users.length > 0) {
      return res.status(409).json({ error: "Email already used" });
    }

    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}


export async function hashPassword(req, res, next){
    try{
        const { password } = req.body

        req.body.hashedPassword = await bcrypt.hash(password, 10);

        delete req.body.password;

        next();
    } catch (err) {
        console.error(err),
        res.sendStatus(500);
    }
}
export const validateUser = [
    body('name')
        .notEmpty().withMessage('Username required')
        .isLength({ min: 2 }).withMessage("2 characters minimum"),
    body("email")
        .notEmpty().withMessage("Email required")
        .isEmail().withMessage("Invalid email format"),
    body("password")
        .notEmpty().withMessage("Password required")
        .isLength({ min: 10 }).withMessage("10 characters minimum")
        .matches(/[A-Z]/).withMessage("Password must have at least one uppercase letter")
        .matches(/[0-9]/).withMessage("Password must have at least one number"),

    handleValidationErrors
];

