const nodemailer = require("nodemailer");
import jwt from "jsonwebtoken";
import { IUser } from "../models/interfaces/IUser";

const { NODE_ENV } = process.env;

class utilFunctions{
    async sendOtpEmail(to:any, otp:any) {

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "wiilliiam.delgado@gmail.com",
                pass: "imlkqaukafiuewwi",
            }
        });
        
        var mailOptions = {
            from: "wiilliiam.delgado@gmail.com",
            to: to,
            subject: "OTP",
            text: otp.toString()
        };
        transporter.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
            }
        });
   }

   async generateToken(tokenUser: IUser) {
    return jwt.sign(
        tokenUser,
        process.env.SECRET_TOKEN || "SECRET_TOKEN",
        {
            expiresIn: 60 * 60 * 18,
        }
    );
}
}

const utilFunc = new utilFunctions();
export default utilFunc;