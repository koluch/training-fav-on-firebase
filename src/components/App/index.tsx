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
  const [newItem, setNewItem] = useState(initialDataState);
  const [dataResult, setDataResult] = useState(initialDataState);
  const [lastItemAddTime, setLastItemAddTime] = useState(new Date().getTime());

  useEffect(() => {
    return props.dataAccess.subscribe((data) => {
      setDataResult(asyncResource.success(data));
    }, (error) => {
      setDataResult(asyncResource.failed(error));
    });
  }, [lastItemAddTime]);

  const handleAddItem = async (newItem: TNewItem) => {
    await props.dataAccess.add(newItem);
    // setLastItemAddTime(new Date().getTime());
  };


  return (
    <div className={styles.root}>
      <Header onAddItem={handleAddItem} />
      <Body dataResult={dataResult} />,
    </div>
  );
}
