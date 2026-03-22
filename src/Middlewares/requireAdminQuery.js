import { query, validationResult } from "express-validator";

export const requireAdminQuery = [
    query('role').equals('admin').withMessage("Admin role required"),

    (req, res, next) => {
        const err = validationResult(req);

        if(!err.isEmpty()){
            return res.status(403).json({
                error: 'forbidden: admin role required'
            })
        }
        next();
    }
]