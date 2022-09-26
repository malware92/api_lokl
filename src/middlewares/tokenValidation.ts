import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";


export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        if (!token) return res.status(401).send({ status: false, message: 'Access Denied' });

        jwt.verify(token, process.env.SECRET_TOKEN || "SECRET_TOKEN", (err: any, decoded: any) => {
            if (err) { return res.status(401).json({ status: false, message: 'Token Expired' }); }
            else { req.body.payload = decoded }
        });
    }

    else { return res.status(401).send({ status: false, message: 'Access Denied' }); }

    next();

}