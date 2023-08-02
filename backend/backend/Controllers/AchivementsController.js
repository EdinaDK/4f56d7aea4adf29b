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
class AchivementsController {
	async createAchiveCourse(req, res) {
		console.log("create Achive Course");
		const { title, description, id_course, hardlevel } = req.body;
		console.log(req.body);
		const query =
			"INSERT INTO courses_achivements (title, description, id_course, hardlevel) VALUES ($1, $2, $3, $4)";
		await queryPool(
			connectPool,
			query,
			[title, description, id_course, hardlevel],
			req,
			res
		);
	}

	async createAchivePractics(req, res) {
		console.log("create Achive Practics");
		const { title, description, id_course, hardlevel } = req.body;
		console.log(req.body);
		const query =
			"INSERT INTO practics_achivements (title, description, id_practics, hardlevel) VALUES ($1, $2, $3, $4)";
		await queryPool(
			connectPool,
			query,
			[title, description, id_course, hardlevel],
			req,
			res
		);
	}

	async getAchiveById(req, res) {
		const { id } = req.params;
		const query =
			"SELECT * FROM courses_achivements WHERE $1 = ANY(users_id)";
		const result = await queryPool(connectPool, query, [id], req, res);
	}

	async updateAchiveCourse(req, res) {
		const userID = req.body.userID;
		const courseID = req.body.courseID;
		const query =
			"UPDATE courses_achivements SET users_id = array_append(users_id, $1) WHERE id_course = $2";
		const result = await queryPool(
			connectPool,
			query,
			[userID, courseID],
			req,
			res
		);
	}
	async updateAchivePractics(req, res) {
		const userID = req.body.userID;
		const practicID = req.body.practicID;
		const query =
			"UPDATE practics_achivements SET users_id = array_append(users_id, $1) WHERE id_practics = $2";
		const result = await queryPool(
			connectPool,
			query,
			[userID, practicID],
			req,
			res
		);
	}

	async getPracticsAchiveById(req, res) {
		const { id } = req.params;
		const query =
			"SELECT * FROM practics_achivements WHERE $1 = ANY(users_id)";
		const result = await queryPool(connectPool, query, [id], req, res);
	}
}

export const achivementsController = new AchivementsController();
