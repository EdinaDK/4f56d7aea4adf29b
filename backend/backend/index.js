import express from "express";
import cors from "cors"; //кросбраузерная ошибка, не дает всем обращаться к моему серверу
// import multer from "multer"; //библиотека для добавления фото
import path from "path";
import { unlink } from "node:fs";
import router from "./router/Router.js";
import * as dotenv from "dotenv"; //скрытые переменные
import { dirname } from "path";
import { migrateDB } from "./migrations.js";
import { fileURLToPath } from "url";
dotenv.config(); // обязательно после импорта .env
try {
	const app = express();
	const __dirname = dirname(fileURLToPath(import.meta.url));
	//startServer();
	app.use(express.json()); //указываем формат принятия данных
	app.use(express.urlencoded({ extended: true })); //принимать данные из формы
	app.use(cors());

	// const storage = multer.diskStorage({
	// 	destination: function (req, file, cb) {
	// 		cb(
	// 			null,
	// 			path.join(
	// 				__dirname,
	// 				"../Fitvend-vending-warehouse/public/uploads/"
	// 			)
	// 		);
	// 	},
	// 	filename: function (req, file, cb) {
	// 		const uniqueSuffix =
	// 			Date.now() + "-" + Math.round(Math.random() * 1e9);
	// 		cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
	// 	},
	// });

	// const upload = multer({ storage: storage });

	// app.post("/addGoods", upload.single("avatar"), async (req, res) => {
	// 	//Добавление товаров по этому пути
	// 	try {
	// 		await goodController.addGoods(req, res);
	// 	} catch (err) {
	// 		res.status(403).send(err);
	// 		unlink(
	// 			`../fitvendsklad/public/uploads/${req.file.filename}`,
	// 			(err) => {
	// 				if (err) {
	// 					console.log("error while deliting file");
	// 				}
	// 				console.log(
	// 					`fitvendsklad/public/uploads/${req.file.filename}`
	// 				);
	// 			}
	// 		);
	// 	}
	// });
	// app.post(
	// 	"/addApparatusImage",
	// 	upload.single("apparatus"),
	// 	async (req, res) => {
	// 		const file = req.file;
	// 		if (!file) {
	// 			const error = new Error("Please upload an image");
	// 			error.httpStatusCode = 400;
	// 			return next(error);
	// 		}
	// 		res.status(201).send({
	// 			fileName: file.filename,
	// 			fileLocation: file.path,
	// 		});
	// 	}
	// );
	app.use("/", router);
	app.listen(5050, () => console.log("listening on port 5050"));
} catch (e) {
	console.log(e);
}
