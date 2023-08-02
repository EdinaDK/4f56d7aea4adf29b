import pg from "pg";
import fs from "fs";
import * as dotenv from "dotenv"; //скрытые переменные
dotenv.config(); // обязательно после импорта .env
export const connectPool = new pg.Pool({
	user: process.env.POSTGRES_USER,
	host: process.env.POSTGRES_HOST,
	database: process.env.POSTGRES_DB,
	password: process.env.POSTGRES_PASS,
	port: process.env.POSTGRES_PORT,
});

/**
 *
 * @param {Подключение к датабазе, выше в коде} pool
 * @param {Строка запроса к датабазе без ;} query
 * @param {Массив значений (Если значения не нужны - передаем пустой массив)} array
 * @param {Запрос к серверу от роутера (экспресс)} req
 * @param {Ответ от сервера (Экспресс)} res
 */

export const queryPool = async (pool, query, array, req, res) => {
	try {
		const result = await pool.query(query, array);
		if (
			query.includes("select") ||
			(query.includes("SELECT") && result.rowCount === 0)
		) {
			res.status(404).json({
				command: query,
				message: "result rows === 0",
			});
		} else {
			res.status(201).json({
				result: result.rows,
				command: query,
			});
		}
	} catch (err) {
		res.status(500).json({
			command: query,
			message: "server error",
		});
		console.error("Error executing query:", err.stack);
	}
};
