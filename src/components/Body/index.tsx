import React from "react";
import { Alert, List, Spin, Tag, Typography } from "antd";
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
        <List.Item key={item.id} className={styles.item}>
          <div className={styles.url}>
            <a href={item.url} target="_blank">
              {item.url}
            </a>
          </div>
          {item.tags.length > 0 && (
            <div className={styles.tags}>
              {item.tags.map((tag: string, i: number) => (
                <Tag key={i}>{tag}</Tag>
              ))}
            </div>
          )}
        </List.Item>
      )}
    />
  );
}

export default function Body(props: Props) {
  return (
    <div className={styles.root}>
      {swch(
        props.dataResult,
        () => (
          <Spin tip="Loading...">{renderList([])}</Spin>
        ),
        r => renderList(r.value),
        r => (
          <Alert
            message="Unable to read link list"
            description={r.error}
            type="error"
          />
        )
      )}
    </div>
  );
}
