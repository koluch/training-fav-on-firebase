import React from "react";
import { Button } from "antd";
import styles from "./index.module.less";

interface Props {
  onSignOut: () => void;
}

export default function UserPanel(props: Props) {
  return (
    <div className={styles.root}>
      <Button onClick={props.onSignOut} type="danger">
        Sign out
      </Button>
    </div>
  );
}
