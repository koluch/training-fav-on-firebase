import React, { FormEvent, useState } from "react";
import { Button, Input } from "antd";
import styles from "./index.module.less";
import { TNewItem } from "../../types";

interface Props {
  onAddItem: (newItem: TNewItem) => void;
}

export default function Header(props: Props) {
  const [url, setUrl] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    props.onAddItem({
      url
    });
  }

  return (
    <div className={styles.root}>
      <form className={styles.newUrlForm} onSubmit={handleSubmit}>
        <Input
          value={url}
          onChange={e => {
            setUrl(e.target.value);
          }}
          className={styles.newUrlFormControl}
          placeholder="URL"
        />
        <Button className={styles.newUrlFormControl} htmlType="submit">
          {"Add"}
        </Button>
      </form>
    </div>
  );
}
