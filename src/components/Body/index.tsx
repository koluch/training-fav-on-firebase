import React from "react";
import { List, Spin, Typography } from "antd";
import styles from "./index.module.less";
import { TData, TItem } from "../../types";
import { AsyncResult, swch } from "../../asyncResource";

interface Props {
  dataResult: AsyncResult<TData>;
}

function renderList(data: TData) {
  return (
    <List
      header={<div>URL</div>}
      bordered
      dataSource={data}
      renderItem={(item: TItem) => (
        <List.Item key={item.id}>
          <a href={item.url}>{item.url}</a>
        </List.Item>
      )}
    />
  )
}


export default function Body (props: Props) {
  return (
    <div className={styles.root}>
      {swch(props.dataResult,
        () => <Spin tip="Loading...">{renderList([])}</Spin>,
        (r) => renderList(r.value),
        (r) => <h1>error: {r.error}</h1>,
      )}
    </div>
  );
}
