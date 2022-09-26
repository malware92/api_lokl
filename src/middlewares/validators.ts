import { check, param, body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from "express";

export const validateReq = (req: Request, res: Response, next: NextFunction) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    next();

}

export const validate = (req: Request, res: Response, next: NextFunction) => {

    //const user : IUser = req.body;

    body('email').isEmail(),
    
    ()=>{
        const errors = validationResult(req);
        console.log(errors);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
    }
    next();

}