import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import compression from "compression";
import database from "./config/database";
import useragent from "express-useragent";
import routes from "./controller";
import { errorResourceNotFound } from "./util/errorhandler";


export default class Server {
	public app: express.Application;
	public port: number;

	constructor(portUser: number) {
		this.app = express();
		this.port = portUser;
		this.config();
		this.routes();
	}

	static init(port: number): Server {
		return new Server(port);
	}

	config(): void {
		dotenv.config();
		try {
			database.conectionMySql();
		} catch (error) {
			console.log(error);
		}

		this.app.use(useragent.express());
		this.app.set("port", process.env.PORT || this.port || 3000);
		this.app.use(morgan("dev"));
		this.app.use(express.json({ limit: "50mb" }));
		this.app.use(express.urlencoded({ extended: false }));

		this.app.use(cors());
		this.app.use((req, res, next) => {
			res.setHeader("Access-Control-Allow-Origin", "*");
			//res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
			//res.setHeader('Access-Control-Allow-Headers', 'X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent,X-Requested-With,content-type');
			//res.setHeader('Access-Control-Allow-Origin', 'https://master.d35wl6dfcxnftz.amplifyapp.com/');
			res.setHeader(
				"Access-Control-Allow-Methods",
				"GET, POST, OPTIONS, PUT, PATCH, DELETE"
			);
			res.setHeader(
				"Access-Control-Allow-Headers",
				"X-Requested-With,content-type"
			);
			next();
		});
		this.app.use(helmet());
		this.app.use(compression());
	}

	routes(): void {
		this.app.use("/api", routes.userController)
        this.app.use(express.static("public"));
		this.app.use(errorResourceNotFound);
	}

	start(): void {
		this.app.listen(this.app.get("port"), () => {
			console.log("Server listening on port", this.app.get("port"));
		});
	}
}

