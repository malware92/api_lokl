import { Router, Request, Response } from "express";
import { tokenValidation } from "../middlewares/tokenValidation";
import { IUser } from "../models/interfaces/IUser";
import userService from "../services/user.services";
import { validateReq } from "../middlewares/validators";

import { check, param, body, validationResult } from 'express-validator';

class UserController {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    async registerUser(req: Request, res: Response){
        const user: IUser = req.body;
        const { status, message, data } = await userService.registerUser(user);
        status
        ? res.status(200).json({ status, message, data })
        : res.status(202).json({ status, message });
    }

    async confirmOtp(req: Request, res: Response){
        const user: IUser = req.body;
        const { status, message, data } = await userService.confirmOtp(user);
        status
        ? res.status(200).json({ status, message, data })
        : res.status(202).json({ status, message });
    }

    async reportInfo(req: Request, res: Response){
        const { fechaIni, fechaFin } = req.body;
        const { status, message, data } = await userService.reportInfo(fechaIni, fechaFin);
        status
        ? res.status(200).json({ status, message, data })
        : res.status(202).json({ status, message });
    }

    routes() {
        this.router.post(
            "/register-user", 
            body('email').isEmail().withMessage('Email no valido'),
            body('shares').isNumeric().custom(( value, {req}) =>{
                if(value >= 20 && value <= 400){
                    return true;
                }
                return false;
            }).withMessage('Shares no valido'),
            validateReq,
            this.registerUser);

        this.router.post(
            "/confirm-otp",
            body('email').isEmail().withMessage('Email no valido'),
            validateReq,
            this.confirmOtp);

        this.router.post(
            "/report-info", 
            tokenValidation, 
            this.reportInfo);
    }
}

const userController = new UserController();
export default userController.router;