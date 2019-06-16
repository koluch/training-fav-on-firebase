import React from "react";
import { List, Typography } from "antd";
import styles from "./index.module.less";
import { TData, TItem } from "../../types";

interface Props {
  data: TData;
}

export default class Body extends React.Component<Props> {
  render() {
    return (
      <div className={styles.root}>
        <List
          header={<div>URL</div>}
          bordered
          dataSource={this.props.data}
          renderItem={(item: TItem) => (
            <List.Item key={item.id}>
              <a href={item.url}>{item.url}</a>
            </List.Item>
          )}
        />
      </div>
    );
  }
}
