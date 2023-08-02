import React, { useEffect, useState } from "react";
import { Header } from "../components/Header/Header";
import styles from "./ExplorePage.module.css";
import { Button } from "antd";
import axios from "axios";
import { useLocation } from "react-router-dom";

function ExploreCoursePage(props: any) {
	const location = useLocation();
	const { item, courses } = location.state || {};
	const userID = props.userInfo[0].id.toString();
	const courseID = item.id;
	const [disabledBtn, setDisabled] = useState(false);

	const checkUserIn = () => {
		if (item.users_id?.includes(Number(userID))) {
			setDisabled(true);
			console.log("included user");
		}
	};

	const handleDone = async (): Promise<void> => {
		axios
			.post("http://localhost:5050/updateUsersInCourses", {
				userID: userID,
				courseID: courseID,
			})
			.then((response) => {
				console.log(response);
				if (response.status === 201) {
					alert("success");
					handleAchive();
				}
			});
	};

	const handleAchive = async (): Promise<void> => {
		axios
			.post("http://localhost:5050/updateAchiveCourse", {
				userID: userID,
				courseID: courseID,
			})
			.then((response) => {
				console.log(response);
			});
	};
	console.log(item);

	useEffect(() => {
		checkUserIn();
	}, []);
	return (
		<>
			<Header />
			<div className={styles.contentWrapper}>
				<h3>{item.title}</h3>
				<p>{item.details}</p>
				<p>{item.textcourse}</p>
				<Button disabled={disabledBtn} onClick={handleDone}>
					Пройти теорию
				</Button>
			</div>
		</>
	);
}

export default ExploreCoursePage;
