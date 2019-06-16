import React from "react";
import { Input, Button } from 'antd';
import styles from "./index.module.less"

interface Props { value: string }

export default class Header extends React.Component<Props, {}> {
  render() {

    return (
      <div className={styles.root}>
        <form className={styles.newUrlForm}>
          <Input className={styles.newUrlFormControl} placeholder="URL" />
          <Button className={styles.newUrlFormControl} htmlType="submit">Add</Button>
        </form>
      </div>
    );
  }
}
