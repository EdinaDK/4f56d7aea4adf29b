import React, { useEffect, useState } from "react";
import { Header } from "../components/Header/Header";
import styles from "./ExplorePage.module.css";
import { Card, Space } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Course {
	id: number;
	title: string;
	details: string;
	textcourse: string;
	hardlevel: number;
}

function ExplorePage(props: any) {
	const [coursesDB, setCoursesDB] = useState<Course[]>([]);
	const navigate = useNavigate();
	const navigateToCourseDetails = (item: Course, courses: Course[]) => {
		navigate("/courses", { state: { item, courses } });
	};
	const getAllCourses = async (): Promise<void> => {
		axios.get("http://localhost:5050/getAllCourses").then((response) => {
			console.log(response.data.result);
			setCoursesDB(response.data.result);
		});
	};

	useEffect(() => {
		getAllCourses();
	}, []);
	return (
		<>
			<Header />
			<div className={styles.contentWrapper}>
				<h2 className={styles.start}>С чего начать:</h2>
				<Space direction="horizontal" size={16}>
					{coursesDB &&
						coursesDB.map((item) => {
							if (item.hardlevel === 1) {
								return (
									<Card
										className={styles.cardEasy}
										key={item.id}
										title={item.title}
										style={{ width: 300, height: 300 }}
										onClick={() =>
											navigateToCourseDetails(
												item,
												coursesDB
											)
										}
									>

										<p>{item.details}</p>
									</Card>
								);
							} else {
								return;
							}
						})}
				</Space>

				<h2>Чем продолжить:</h2>
				<Space direction="horizontal" size={16}>
					{coursesDB &&
						coursesDB.map((item) => {
							if (item.hardlevel === 2) {
								return (
									<Card
									className={styles.cardMedium}
										key={item.id}
										title={item.title}
										style={{ width: 300, height: 300}}
										onClick={() =>
											navigateToCourseDetails(
												item,
												coursesDB
											)
										}
									>

										<p>{item.details}</p>
									</Card>
								);
							} else {
								return;
							}
						})}
				</Space>
				<h2>Если ты уже профи:</h2>
				<Space direction="horizontal" size={16}>
					{coursesDB &&
						coursesDB.map((item) => {
							if (item.hardlevel === 3) {
								return (
									<Card
									className={styles.cardHard}
									key={item.id}
										title={item.title}
										style={{ width: 300, height: 300 }}
										onClick={() =>
											navigateToCourseDetails(
												item,
												coursesDB
											)
										}
									>
										<p>{item.details}</p>
									</Card>
								);
							} else {
								return;
							}
						})}
				</Space>
			</div>
		</>
	);
}

export default ExplorePage;
