import React, { useEffect, useState } from "react";
import Header from "../Header";
import Body from "../Body";
import styles from "./index.module.less";
import DataAccess from "../../DataAccess";
import * as asyncResource from "../../asyncResource";
import { AsyncResult, swch } from "../../asyncResource";
import { TData } from "../../types";
import { Spin } from "antd";

interface Props {
  dataAccess: DataAccess,
}

export default function App(props: Props) {

  let initialDataState: AsyncResult<TData> = asyncResource.fetching();
  const [dataResult, setDataResult] = useState(initialDataState);

  useEffect(() => {
    props.dataAccess.getList().then((data) => {
      setDataResult(asyncResource.success(data));
    })
  }, [props.dataAccess]);

  return (
    <div className={styles.root}>
      <Header value="fuck" />
      <Body dataResult={dataResult} />,
    </div>
  );
}
