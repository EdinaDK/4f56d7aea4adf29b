import pg from "pg";
import * as dotenv from "dotenv";
import { queryPool } from "../connectPool.js";
const connectPool = new pg.Pool({
	user: process.env.POSTGRES_USER,
	host: process.env.POSTGRES_HOST,
	database: process.env.POSTGRES_DB,
	password: process.env.POSTGRES_PASS,
	port: process.env.POSTGRES_PORT,
});
class UserController {
	async register(req, res) {
		console.log("register");
		const { login, email, name, surname, city, photo_link, password } =
			req.body;
		console.log(req.body);
		const query =
			"INSERT INTO users (login, email, name, surname, city, photo_link, password) VALUES ($1, $2, $3, $4, $5, $6, $7)";
		await queryPool(
			connectPool,
			query,
			[login, email, name, surname, city, photo_link, password],
			req,
			res
		);
	}
	async userEdit(req, res) {
		console.log("Edit user");
		const { id, name, surname, city } = req.body;
		console.log(req.body);
		const query =
			"UPDATE users SET name = $2, surname = $3, city = $4 WHERE id = $1";
		await queryPool(
			connectPool,
			query,
			[id, name, surname, city],
			req,
			res
		);
	}

	async login(req, res) {
		const { login, password } = req.body;
		const query = "SELECT * FROM users WHERE login = $1 AND password = $2";
		await queryPool(connectPool, query, [login, password], req, res);
	}
}

export const userController = new UserController();
