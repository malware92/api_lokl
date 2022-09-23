import { createConnection } from "typeorm";
import env from "../config/environments";

class Database {
	constructor() {}

	async conectionMySql() {
		const connection = await createConnection({
			name: "default",
			type: "mysql",
			host: env.DATABASE.host,
			port: env.DATABASE.port,
			username: env.DATABASE.username,
			password: env.DATABASE.password,
			database: env.DATABASE.name,
			connectTimeout: 180000,
			maxQueryExecutionTime: 180000,
			charset: "utf8_unicode_ci",
			multipleStatements: true,
			entities: process.env.LOCAL
				? ["src/models/*.entity{.ts,.js}"]
				: ["dist/models/*.entity{.ts,.js}"],
		})
			.then(() => {
				console.log("Connection to MySql Create Sucessfully");
			})
			.catch((err) => {
				console.log(err);
				console.log({
					message:
						"Invalid credentials, check PORT, HOST, USERNAME, PASSWORD or DATABASE_NAME to access",
					error: err.errno,
					host: err.address,
					port: err.port,
				});
			});
	}
}

export default new Database();
