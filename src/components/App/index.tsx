import React, { useEffect, useState } from "react";
import Header from "../Header";
import Body from "../Body";
import styles from "./index.module.less";
import DataAccess from "../../DataAccess";
import * as asyncResource from "../../asyncResource";
import { AsyncResult } from "../../asyncResource";
import { TData, User } from "../../types";
import UserPanel from "../UserPanel";
import { notification } from "antd";
import { parseUrl } from "../../utils";

interface Props {
  user: User;
  onSignOut: () => void;
  dataAccess: DataAccess;
}

export default function App(props: Props) {
  let initialDataState: AsyncResult<TData> = asyncResource.fetching();
  const [newItem, setNewItem] = useState({
    text: "",
    tags: [],
    isFetching: false
  });
  const [dataResult, setDataResult] = useState(initialDataState);

  useEffect(() => {
    return props.dataAccess.subscribe(
      data => {
        setDataResult(asyncResource.success(data));
      },
      error => {
        setDataResult(asyncResource.failed(error));
      }
    );
  }, []);

  const handleAddItem = async () => {
    setDataResult(asyncResource.fetching());
    setNewItem({ ...newItem, isFetching: true });
    try {
      const newItemData = {
        url: parseUrl(newItem.text),
        tags: newItem.tags,
        uid: props.user.id
      };
      await props.dataAccess.add(newItemData);
      setNewItem({ ...newItem, text: "", tags: [], isFetching: false });
    } catch (e) {
      notification.error({
        message: "Unable to add link",
        description: e.message
      });
      setDataResult(dataResult);
      setNewItem({ ...newItem, isFetching: false });
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.panel}>
          <UserPanel onSignOut={props.onSignOut} />
        </div>
        <div className={styles.panel}>
          <Header
            newItemValue={newItem}
            onChangeNewItemTags={(tags: string[]) => {
              setNewItem({ ...newItem, tags });
            }}
            onChangeNewItemText={(text: string) => {
              setNewItem({ ...newItem, text });
            }}
            onAddItem={handleAddItem}
          />
        </div>
        <div className={styles.panel}>
          <Body dataResult={dataResult} />
        </div>
      </div>
    </div>
  );
}
