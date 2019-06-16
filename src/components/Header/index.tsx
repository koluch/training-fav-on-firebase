import React from "react";
import { Button, Input } from "antd";
import styles from "./index.module.less";

export default function Header() {
  return (
    <div className={styles.root}>
      <form className={styles.newUrlForm}>
        <Input className={styles.newUrlFormControl} placeholder="URL"/>
        <Button className={styles.newUrlFormControl} htmlType="submit">Add</Button>
      </form>
    </div>
  );
}
