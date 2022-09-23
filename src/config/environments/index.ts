import dotenv from "dotenv";
dotenv.config();
import development from "./development";
//const { NODE_ENV } = process.env;

let currentEnviroment = development;

//if (NODE_ENV === "production") {
//	currentEnviroment = production;
//}

export default currentEnviroment;
