import React, { useEffect, useState } from "react";
import { Header } from "../components/Header/Header";
import styles from "./ExplorePage.module.css";
import { Button } from "antd";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { response } from "express";
import { Editor } from "./Editor";


function PracticeTrainPage(props: any) {
  const location = useLocation();
  const { item, courses } = location.state || {};
  const userID = props.userInfo[0].id.toString();
  const practicID = item.id;
  const [disabledBtn, setDisabled] = useState(false);

  const checkUserIn = () => {
    if (item.users_id?.includes(Number(userID))) {
      setDisabled(true);
      console.log("included user");
    }
  };

  const handleDone = async (): Promise<void> => {
    axios
      .post("http://localhost:5050/updateUsersInPractics", {
        userID: userID,
        practicID: practicID,
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
      .post("http://localhost:5050/updateAchivePractics", {
        userID: userID,
        practicID: practicID,
      })
      .then((response) => {
        console.log(response);
      });
  };
  console.log(item);

  useEffect(() => {
    checkUserIn();
  }, []);

  const [code, setCode] = useState<string>("");
  const [srcDoc, setSrcDoc] = useState('')
  
  const runCode = () => { setSrcDoc (`
  <html>
  <script>${code}</script>
  </html>
  `)
}



  return (
    <>
      <Header />
      <div className={styles.contentWrapper}>
        <h2>{item.title}</h2>
        <p>{item.practics_text}</p>
        <br />
        <img src={item.image_url} alt="" />
        <br />
        <br />
        <p>Нужно поставить отметку, если у вас получилось решить задачу</p>
        <br />
        <Button disabled={disabledBtn} onClick={handleDone}>
          Выполнено
        </Button>
        <br />
        <div className={styles.codemirror}>
          <Editor language="javascript" value={code} onChange={setCode} />
        </div>
        <button onClick={runCode} className={styles.runcode}>Run code</button>
        <div>
          <iframe  className={styles.output}
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            frameBorder="0"
            width="100%"
            height="100%"
            color="#EEFFFF"
          />
        </div>
      </div>
    </>
  );
}

export default PracticeTrainPage;
