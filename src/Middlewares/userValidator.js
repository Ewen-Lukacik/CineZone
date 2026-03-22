import { body } from "express-validator";
import handleValidationErrors from "./handleValidationErrors.js";

export const validateUser = [
    body('name')
        .notEmpty().withMessage('Username required')
        .isLength({ min: 2 }).withMessage("2 characters minimum"),
    body("email")
        .notEmpty().withMessage("Email required")
        .isEmail().withMessage("Invalid email format"),
    body("password")
        .notEmpty().withMessage("Password required")
        .isLength({ min: 10 }).withMessage("10 characters minimum"),

    handleValidationErrors
];