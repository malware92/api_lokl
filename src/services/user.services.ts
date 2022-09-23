import moment from "moment";
import { IUser } from "../models/interfaces/IUser";
import { Users } from "../models/user.entity";
import { HttpResponse } from "../util/HttpResponse";
import { getConnection, getRepository } from "typeorm";
//import { nodemailer } from "nodemailer";
//onst nodemailer = require("nodemailer");
import utilFunc from "../util/functions";

class UserService {

    async registerUser(infoUser: IUser){
        const httpResponse = new HttpResponse();

        try {
            if ( infoUser.email === "" || !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g.test( infoUser.email)){
                httpResponse.error(`El email ${infoUser.email} no es correcto`);
			    return httpResponse;
            }

            if (infoUser.shares){
                if ( infoUser.shares < 20 || infoUser.shares > 400 ){
                    httpResponse.error(`El campo shares no cumple las condiciones mayor a 20 y menor a 400`);
                    return httpResponse;
                }
            }
            
            let fechaAux = moment().format("YYYY-MM-DD");
            const otp = Math.floor(1000 + Math.random() * 9000);

            const user = {
                nameUser: infoUser.name,
                emailUser: infoUser.email,
                sharesUser: infoUser.shares,
                fechaUser: fechaAux,
                otpUser: otp,
                statusUser: 0
            };

            const infoCreate = await getConnection()
					.createQueryBuilder()
					.insert()
					.into(Users)
					.values(user)
					.execute();
            
            
            utilFunc.sendOtpEmail(infoUser.email,otp);
            //this.sendOtpEmail(infoUser.email,otp);

            httpResponse.success("Creación exitosa",infoCreate);
            return httpResponse;

        } catch (error) {
            httpResponse.error(error);
            return httpResponse;
        }
    }

    async confirmOtp (infoUser: IUser){
        const httpResponse = new HttpResponse();

        try {
            
            if ( infoUser.email === "" || !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g.test( infoUser.email)){
                httpResponse.error(`El email ${infoUser.email} no es correcto`);
			    return httpResponse;
            }

            if(!infoUser.otp){
                httpResponse.error(`El otp no es correcto`);
                return httpResponse;
            }

            const repoUser = getRepository(Users);
            const infoRepo = await repoUser.findOne({
                where: {
                    emailUser: infoUser.email,
                    otpUser: Number(infoUser.otp)
                },
            });

            if(infoRepo){
                const updateUser = await getConnection()
                    .createQueryBuilder()
                    .update(Users)
                    .set({
                        statusUser: 1,
                    })
                    .where("id = :id", { id: infoRepo.idUser })
                    .execute();
                
                const token = await utilFunc.generateToken(infoUser);

                httpResponse.findOne({ token });
                return httpResponse;
            }

            httpResponse.emptyRecords();
            return httpResponse;
        } catch (error) {
            httpResponse.error(error);
            return httpResponse;
        }
    }

    async reportInfo(fechaIni: any, fechaFin: any){
        const httpResponse = new HttpResponse();

        try {
            const procPymes = await getConnection()
				.getRepository(Users)
				.createQueryBuilder("u")
				.select("email as email")
				.where("u.date_register >= :fechaIni", {fechaIni})
				.andWhere("u.date_register <= :fechaFin", {fechaFin})
				.getRawMany();

            if(procPymes){
                httpResponse.findAll(procPymes);
                return httpResponse;
            }

            httpResponse.emptyRecords();
            return httpResponse;
        } catch (error) {
            httpResponse.error(error);
            return httpResponse;
        }
    }
}

const userService = new UserService();
export default userService;