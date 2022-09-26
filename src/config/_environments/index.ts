
//Importa las variables y sus valores del archivo .env
import dotenv from "dotenv";
dotenv.config();
//importa las variables de configuración de la DB
import development from "./development";
//const { NODE_ENV } = process.env;

//Asigna el objeto con las variables de la DB a una variable 
let currentEnviroment = development;

//if (NODE_ENV === "production") {
//	currentEnviroment = production;
//}

//Exporta la variable anteriormente asignada con el objeto de la info del la DB
export default currentEnviroment;
