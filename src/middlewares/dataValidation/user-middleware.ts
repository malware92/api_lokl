import { body } from "express-validator";

const registerUserValidation = [
    body('email').isEmail().withMessage('Email no valido'),
    body('shares').isNumeric().custom(( value, {req}) =>{
        if(value >= 20 && value <= 400){
            return true;
        }
        return false;
        }).withMessage('Shares no valido'),
];

const confirmUserValidation = [
    body('email').isEmail().withMessage('Email no valido'),
    body('otp').isNumeric().isLength({min: 4}).withMessage('Otp no valido'),
];

export { registerUserValidation, confirmUserValidation }

