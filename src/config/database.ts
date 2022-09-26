import { createConnection } from "typeorm";
import env from "../config/_environments";

class Database {
	constructor() {}

	async conectionMySql() {
		const host = process.env.DATABASE_HOST;
		const port = process.env.DATABASE_PORT;
		const u = process.env.DATABASE_USERNAME;
		const p = process.env.DATABASE_PASSWORD;
		const db = process.env.DATABASE_NAME;

		const connection = await createConnection({
			name: "default",
			type: "mysql",
			host: host,
			port: Number(port),
			username: u,
			password: p,
			database: db,
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
