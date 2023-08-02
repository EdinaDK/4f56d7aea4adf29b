import React, { useEffect, useState } from "react";
import { Header } from "../components/Header/Header";
import styles from "./PracticePage.module.css";
import { Card, Space } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Practice {
	id: number;
	id_course: number;
	title: string;
	description: string;
	image_url: string;
	practics_text: string;
	hardlevel: number;
}

function PracticePage(props: any) {
	const [practicsDB, setPracticsDB] = useState<Practice[]>([]);
	const navigate = useNavigate();

	const navigateToPracticeDetails = (item: Practice, courses: Practice[]) => {
		navigate("/practice-train", { state: { item, courses } });
	};
	const getAllPractics = async (): Promise<void> => {
		axios.get("http://localhost:5050/getAllPractics").then((response) => {
			console.log(response.data.result);
			setPracticsDB(response.data.result);
		});
	};

	useEffect(() => {
		getAllPractics();
	}, []);
	return (
		<>
			<Header />
			<div className={styles.contentWrapper}>
				<h2>С чего начать:</h2>
				<Space direction="horizontal" size={16}>
					{practicsDB &&
						practicsDB.map((item) => {
							if (item.hardlevel === 1) {
								console.log(item);
								return (
									<Card
									className={styles.cardEasy}
										key={item.id}
										title={item.title}
										style={{ width: 300, height: 300 }}
										onClick={() =>
											navigateToPracticeDetails(
												item,
												practicsDB
											)
										}
									>
										<p>{item.description}</p>
									</Card>
								);
							} else {
								return;
							}
						})}
				</Space>

				<h2>Чем продолжить:</h2>
				<Space direction="horizontal" size={16}>
					{practicsDB &&
						practicsDB.map((item) => {
							if (item.hardlevel === 2) {
								return (
									<Card
									className={styles.cardMedium}
										key={item.id}
										title={item.title}
										style={{ width: 300, height: 300 }}
										onClick={() =>
											navigateToPracticeDetails(
												item,
												practicsDB
											)
										}
									>
										<p>{item.description}</p>
									</Card>
								);
							} else {
								return;
							}
						})}
				</Space>
				<h2>Если ты уже профи:</h2>
				<Space direction="horizontal" size={16}>
					{practicsDB &&
						practicsDB.map((item) => {
							if (item.hardlevel === 3) {
								return (
									<Card
									className={styles.cardHard}
										key={item.id}
										title={item.title}
										style={{ width: 300, height: 300 }}
										onClick={() =>
											navigateToPracticeDetails(
												item,
												practicsDB
											)
										}
									>
										<p>{item.description}</p>
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

export default PracticePage;
