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
  const [newItem, setNewItem] = useState({ text: '', isFetching: false });
  const [dataResult, setDataResult] = useState(initialDataState);

  useEffect(() => {
    return props.dataAccess.subscribe((data) => {
      setDataResult(asyncResource.success(data));
    }, (error) => {
      setDataResult(asyncResource.failed(error));
    });
  });

  const handleAddItem = async () => {
    setNewItem({ ...newItem, isFetching: true });
    await props.dataAccess.add({ url: newItem.text });
    setNewItem({ ...newItem, text: '', isFetching: false });
  };

  return (
    <div className={styles.root}>
      <Header
        newItemValue={newItem}
        onChangeNewItemText={(text: string) => {
          setNewItem({...newItem, text })
        }}
        onAddItem={handleAddItem}
      />
      <Body dataResult={dataResult} />,
    </div>
  );
}
