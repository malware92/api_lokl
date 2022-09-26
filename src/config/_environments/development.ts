//Archivo encargado de traer la información de las variables del .env y posteriormente exportarlas para ser usadas como import en otra clase/metodo/functions
export default {
	PORT: process.env.PORT_DEV,
	DATABASE: {
		host: process.env.DATABASE_HOST,
		port: parseInt(process.env.DATABASE_PORT ?? "7102"),
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		name: process.env.DATABASE_NAME,
	},
};
