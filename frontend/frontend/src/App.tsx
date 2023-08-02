import React, { useEffect } from "react";
import "./App.css";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import ExplorePage from "./pages/ExplorePage";
import PracticePage from "./pages/PracticePage";
import UserPage from "./pages/UserPage";
import { useState } from "react";
import ExploreCoursePage from "./pages/ExploreCoursePage";
import PracticeTrainPage from "./pages/PracticeTrainPage";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userInfo, setUserInfo] = useState<User[]>([]);

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

	useEffect(() => {
		console.log("USER INFO", userInfo);
	}, [userInfo]);
	return (
		<>
			<Routes>
				<Route
					path="/"
					element={
						isLoggedIn ? (
							<ExplorePage />
						) : (
							<MainPage
								isLoggedIn={isLoggedIn}
								setLoginState={setIsLoggedIn}
								setUserInfo={setUserInfo}
							/>
						)
					}
				/>
				<Route
					path="/explore"
					element={isLoggedIn ? <ExplorePage /> : <Navigate to="/" />}
				/>
				<Route
					path="/practice"
					element={
						isLoggedIn ? <PracticePage /> : <Navigate to="/" />
					}
				/>
				<Route
					path="/user"
					element={
						isLoggedIn ? (
							<UserPage userInfo={userInfo} />
						) : (
							<Navigate to="/" />
						)
					}
				/>
				<Route
					path="/courses"
					element={
						isLoggedIn ? (
							<ExploreCoursePage userInfo={userInfo} />
						) : (
							<Navigate to="/" />
						)
					}
				/>
				<Route
					path="/practice-train"
					element={
						isLoggedIn ? (
							<PracticeTrainPage userInfo={userInfo} />
						) : (
							<Navigate to="/" />
						)
					}
				/>
			</Routes>
		</>
	);
}

export default App;
