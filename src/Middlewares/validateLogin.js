import { body } from "express-validator";
import handleValidationErrors from "./handleValidationErrors.js";

export const validateLogin = [
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