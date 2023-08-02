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
class CoursesController {
	async createCourse(req, res) {
		console.log("create course");
		const { title, details, textCourse, hardLevel } = req.body;
		console.log(req.body);
		const query =
			"INSERT INTO courses (title, details, textCourse, hardLevel) VALUES ($1, $2, $3, $4)";
		await queryPool(
			connectPool,
			query,
			[title, details, textCourse, hardLevel],
			req,
			res
		);
	}
	async getAllCourses(req, res) {
		const query = "SELECT * FROM courses";
		const result = await queryPool(connectPool, query, [], req, res);
	}
	async getAllPractics(req, res) {
		const query = "SELECT * FROM practics_for_courses";
		const result = await queryPool(connectPool, query, [], req, res);
	}

	async updateUsersInCourses(req, res) {
		const userID = req.body.userID;
		const courseID = req.body.courseID;
		const query =
			"UPDATE courses SET users_id = array_append(users_id, $1) WHERE id = $2";
		const result = await queryPool(
			connectPool,
			query,
			[userID, courseID],
			req,
			res
		);
	}

	async createPracticsForCourses(req, res) {
		console.log("create Practics");
		const {
			id_course,
			title,
			description,
			image_url,
			practics_text,
			users_id,
		} = req.body;
		console.log(req.body);
		const query =
			"INSERT INTO practics_for_courses (id_course, title, description, image_url, practics_text, users_id) VALUES ($1, $2, $3, $4, $5, $6)";
		await queryPool(
			connectPool,
			query,
			[id_course, title, description, image_url, practics_text, users_id],
			req,
			res
		);
	}

	async updateUsersInPractics(req, res) {
		const userID = req.body.userID;
		const practicID = req.body.practicID;
		const query =
			"UPDATE practics_for_courses SET users_id = array_append(users_id, $1) WHERE id = $2";
		const result = await queryPool(
			connectPool,
			query,
			[userID, practicID],
			req,
			res
		);
	}
}

export const coursesController = new CoursesController();
