import React, { useEffect, useState } from "react";
import { Header } from "../components/Header/Header";
import styles from "./UserPage.module.css";
import { ReactComponent as IconProfile } from "../components/images/userPhoto.svg";
import { Input, Image, Button } from "antd";
import axios from "axios";
import { response } from "express";
import { ReactComponent as Cup } from "../components/images/cup.svg";

type User = {
	id: number;
	login: string;
	password: string;
	email: string;
	reg_date: string;
	name: string;
	surname: string | null;
	city: string | null;
	photo_link: string | null;
};

type UserPageProps = {
	userInfo: User[];
};

function UserPage(props: UserPageProps) {
	const [achievements, setAchivements] = useState<
		{ id: number; title: string; description: string }[]
	>([]);
	const [achievementsPractics, setAchivementsPractics] = useState<
		{ id: number; title: string; description: string }[]
	>([]);
	const user = props.userInfo[0];
	const id = user.id;
	const regDate = user?.reg_date.split("T")[0];
	const [newUserName, setNewUserName] = useState(user.name);
	const [newUserSurname, setNewUserSurname] = useState(
		user.surname ? user.surname : "Нет"
	);
	const [newUserCity, setNewUserCity] = useState(
		user.city ? user.city : "Нет"
	);

	const getAllAchivementsCourses = async () => {
		axios
			.get(`http://localhost:5050/getAchiveById/${id}`)
			.then((response) => {
				console.log(response);
				setAchivements(response.data.result);
			});
	};
	const getAllAchivementsPractics = async () => {
		axios
			.get(`http://localhost:5050/getPracticsAchiveById/${id}`)
			.then((response) => {
				console.log(response);
				setAchivementsPractics(response.data.result);
			});
	};

	const handleSubmit = async (): Promise<void> => {
		let data = {
			id,
			name: newUserName,
			surname: newUserSurname,
			city: newUserCity,
		};
		console.log(data);
		axios.post("http://localhost:5050/userEdit", data).then((response) => {
			if (response.status === 201) {
				console.log(response);
				alert("success. Please, reload your application");
			}
		});
	};

	const showAchievments = [...achievements, ...achievementsPractics].map(
		(item) => {
			return (
				<div className={styles.prize}>

					<Cup className={styles.cup}/>
					<h4 className={styles.nameAch}>{item.title}</h4>
					<h4>{item.description}</h4>
				</div>
			);
		}
	);
	useEffect(() => {
		getAllAchivementsCourses();
		getAllAchivementsPractics();
	}, []);
	return (
		<>
			<Header />
			<div className={styles.userPage}>
				<div className={styles.profileIcon}>
					<Image
						className={styles.userPhoto}
						width={"50%"}
						src={user.photo_link ? user.photo_link : "Нет"}
					/>
					<div className={styles.userInfo}>
						<Input
							className={styles.userinfoText}
							value={newUserName}
							onChange={(e) => setNewUserName(e.target.value)}
						/>
						<Input
							className={styles.userinfoText}
							value={newUserSurname}
							onChange={(e) => setNewUserSurname(e.target.value)}
						/>
						<Input
							className={styles.userinfoText}
							value={newUserCity}
							onChange={(e) => setNewUserCity(e.target.value)}
						/>
						<Input
							className={styles.userinfoText}
							value={regDate.toString().split("-").reverse().join("-")}
							disabled
						/>
						<Input
							className={styles.userinfoText}
							value={user.email}
							disabled
						/>
						<Input
							className={styles.userinfoText}
							value={`id:${user.id}`}
							disabled
						/>
					</div>
					<Button onClick={handleSubmit} className={styles.btnEdit}>
						Редактировать данные
					</Button>
					<p className={styles.userLogin}>@{user.login}</p>
				</div>
				<div className={styles.stats}></div>
				<div className={styles.achieves}>
					<div className={styles.titleAch}>
						<h3 className={styles.titAchieves}>Достижения</h3>
					</div>
					<div className={styles.prizes}>{showAchievments}</div>
				</div>
			</div>
		</>
	);
}

export default UserPage;
