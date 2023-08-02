import express from "express";
import cors from "cors"; //кросбраузерная ошибка, не дает всем обращаться к моему серверу
import multer from "multer"; //библиотека для добавления фото
import { dirname } from "path";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv"; //скрытые переменные
import { coursesController } from "../Controllers/CoursesController.js";
import { achivementsController } from "../Controllers/AchivementsController.js";

import { userController } from "../Controllers/UserController.js";
// router create
const router = express.Router();
router.use(express.json()); //указываем формат принятия данных
router.use(express.urlencoded({ extended: true })); //принимать данные из формы
// router.use(cors());
router.use(
	cors({
		credentials: true,
		origin: "http://localhost:3000",
		optionsSuccessStatus: 201,
	})
);
dotenv.config(); // обязательно после импорта .env

router.post("/login", async (req, res) => {
	await userController.login(req, res);
});
router.post("/register", async (req, res) => {
	await userController.register(req, res);
});
router.post("/userEdit", async (req, res) => {
	await userController.userEdit(req, res);
});
//----------------------------------------------------------------
router.post("/createCourse", async (req, res) => {
	await coursesController.createCourse(req, res);
});
router.get("/getAllCourses", async (req, res) => {
	await coursesController.getAllCourses(req, res);
});
router.get("/getAllPractics", async (req, res) => {
	await coursesController.getAllPractics(req, res);
});
router.post("/updateUsersInCourses", async (req, res) => {
	await coursesController.updateUsersInCourses(req, res);
});
router.post("/updateUsersInPractics", async (req, res) => {
	await coursesController.updateUsersInPractics(req, res);
});
router.post("/createPracticsForCourses", async (req, res) => {
	await coursesController.createPracticsForCourses(req, res);
});
//----------------------------------------------------------------
router.post("/createAchiveCourse", async (req, res) => {
	await achivementsController.createAchiveCourse(req, res);
});
router.post("/createAchivePractics", async (req, res) => {
	await achivementsController.createAchivePractics(req, res);
});
router.post("/updateAchiveCourse", async (req, res) => {
	await achivementsController.updateAchiveCourse(req, res);
});
router.get("/getAchiveById/:id", async (req, res) => {
	await achivementsController.getAchiveById(req, res);
});
router.post("/updateAchivePractics", async (req, res) => {
	await achivementsController.updateAchivePractics(req, res);
});
router.get("/getPracticsAchiveById/:id", async (req, res) => {
	await achivementsController.getPracticsAchiveById(req, res);
});

export default router;
