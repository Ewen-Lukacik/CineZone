import { check } from "express-validator";
import handleValidationErrors from "./handleValidationErrors.js";


export const movieValidator = [
    check("title").isLength({ min:1 }).withMessage("Movie name required"),
    check("director").notEmpty().withMessage("Director name required"),
    check("release_year").isInt({ min:1895 }).withMessage('Movie cannot be older than first movie in history'),
    check("rating").isFloat({ min:0, max:10 }).withMessage("Basic rating range required"),
    check("category_id").isInt().withMessage("How did u do that ?"),
    
    handleValidationErrors
];