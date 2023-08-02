import React, { useState } from "react";
import styles from "./MainPage.module.css";
import { Authorization } from "../components/Authorization/Authorization";
import { Registration } from "../components/Registration";
import CountUp from "react-countup";
import TypeScript from "../components/images/hello-world.gif";
import { Editor } from "./Editor";
type MainPageProps = {
	isLoggedIn: boolean;
	setLoginState: React.Dispatch<React.SetStateAction<boolean>>;
	setUserInfo: React.Dispatch<React.SetStateAction<any[]>>;
};

export const MainPage: React.FC<MainPageProps> = ({
	isLoggedIn,
	setLoginState,
	setUserInfo,
}) => {
	const [openLoginForm, setIsOpenLoginForm] = React.useState(false);
	const [openRegisterForm, setIsOpenRegisterForm] = React.useState(false);
	const handleLoginFormShow = () => {
		setIsOpenLoginForm(true);
	};
	const handleRegisterFormShow = () => {
		setIsOpenRegisterForm(true);
	};

	const handleLoginFormHide = () => {
		setIsOpenLoginForm(false);
	};

	const handleRegisterFormHide = () => {
		setIsOpenRegisterForm(false);
	};

	const [code, setCode] = useState<string>(`console.log("hello, world")`);

	return (
		<div
			style={{
				position: "fixed",
				top: "0",
				left: "0",
				width: "100%",
				background:
					"linear-gradient(90deg, rgba(2, 0, 36, 0.9990371148459384) 0%, " +
					"rgba(115, 1, 121, 1) 39%, rgba(0, 212, 255, 1) 100%)",
				height: "100%",
				overflowX: "hidden",
			}}
			className={styles.main}
		>
			<h1 className={styles.title}>
				Изучай TypeScript по-новому <br /> вместе с TypeCode
			</h1>
			<button
				className={`${styles.buttons} ${styles.signIn}`}
				onClick={handleLoginFormShow}
			>
				Войти
			</button>
			<div className={styles.container}>
				<div className={styles.blockLeft}>
					<p className={`${styles.paragraph} ${styles.one}`}>
						Новые способы изучения, включающие в себя теоритеские и
						практические методы. Решай более 209192 задач, проходи
						более 30 тематических курсов и получай значки за каждое
						успешное прохождение!!
					</p>
					<img style={{ width: "100%" }} src={TypeScript} />
				</div>
				<div className={styles.blockRight}>
					<div>
						{" "}
						<CountUp
							end={119123}
							duration={5}
							className={styles.countUp}
							suffix={" строк"}
						/>{" "}
					</div>
					<p className={`${styles.paragraph} ${styles.one}`}>
					Typescript - это язык программирования, который представляет собой надстройку над Javascript и позволяет разработчикам создавать более надежные и масштабируемые приложения. 
					</p>
					<p className={`${styles.paragraph} ${styles.one}  ${styles.codemirror}`}>
					<div className={styles.codemirror}>
          <Editor language="javascript" value={code} onChange={setCode} className={styles.codemirror} />
        </div>
					</p>
					<p className={`${styles.paragraph} ${styles.one}`}>
					Наша платформа разработана таким образом, чтобы максимально упростить процесс изучения. Вы можете выбрать удобный для себя график занятий и изучать материалы в своем темпе.  
					</p>
					<p className={`${styles.paragraph} ${styles.one}`}>
					Присоединяйтесь к нашей онлайн платформе и начните свой путь к освоению Typescript уже сегодня!
					</p>
				</div>
			</div>
			<button
				className={`${styles.buttons} ${styles.signUp}`}
				onClick={handleRegisterFormShow}
			>
				Создать аккаунт
			</button>
			{openLoginForm ? (
				<Authorization
					setLoginState={setLoginState}
					handleLoginFormHide={handleLoginFormHide}
					isLoggedIn={isLoggedIn}
					setUserInfo={setUserInfo}
				/>
			) : null}
			{openRegisterForm ? (
				<Registration handleRegisterFormHide={handleRegisterFormHide} />
			) : null}
		</div>
	);
};
export default MainPage;
