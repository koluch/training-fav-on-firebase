import React, { useEffect, useState } from "react";
import Header from "../Header";
import Body from "../Body";
import styles from "./index.module.less";
import DataAccess from "../../DataAccess";
import * as asyncResource from "../../asyncResource";
import { AsyncResult, swch } from "../../asyncResource";
import { TData, TNewItem } from "../../types";
import { Spin } from "antd";

interface Props {
  dataAccess: DataAccess,
}

export default function App(props: Props) {

  let initialDataState: AsyncResult<TData> = asyncResource.fetching();
  const [dataResult, setDataResult] = useState(initialDataState);
  const [lastItemAddTime, setLastItemAddTime] = useState(new Date().getTime());

  useEffect(() => {
    const handleFetchList = async () => {
      setDataResult(asyncResource.fetching())
      return props.dataAccess.getList().then((data) => {
        setDataResult(asyncResource.success(data));
      }).catch((e) => {
        setDataResult(asyncResource.failed(e.message));
      })
    };

    handleFetchList();
  }, [lastItemAddTime]);

  const handleAddItem = async (newItem: TNewItem) => {
    await props.dataAccess.add(newItem);
    setLastItemAddTime(new Date().getTime());
  };


  return (
    <div className={styles.root}>
      <Header onAddItem={handleAddItem} />
      <Body dataResult={dataResult} />,
    </div>
  );
}
