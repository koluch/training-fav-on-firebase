import React, { useState, useEffect } from "react";
import Header from "../Header";
import Body from "../Body";
import styles from "./index.module.less"
import DataAccess from "../../DataAccess";

interface Props {
  dataAccess: DataAccess,
}

export default function App(props: Props) {

  const [data, setData] = useState([]);

  useEffect(() => {
    props.dataAccess.getList().then((data) => {
      setData(data);
    })
  });

  return (
    <div className={styles.root}>
      <Header value="fuck" />
      <Body data={data} />
    </div>
  );
}
