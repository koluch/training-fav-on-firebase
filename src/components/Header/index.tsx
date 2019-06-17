import React, { FormEvent } from "react";
import { Button, Input } from "antd";
import styles from "./index.module.less";

export interface NewItemState {
  text: string;
  isFetching: boolean;
}

interface Props {
  newItemValue: NewItemState;
  onChangeNewItemText: (text: string) => void;
  onAddItem: () => void;
}

export default function Header(props: Props) {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    props.onAddItem();
  }

  const { newItemValue } = props;
  return (
    <div className={styles.root}>
      <form className={styles.newUrlForm} onSubmit={handleSubmit}>
        <Input
          disabled={newItemValue.isFetching}
          value={newItemValue.text}
          onChange={e => {
            props.onChangeNewItemText(e.target.value);
          }}
          className={styles.newUrlFormControl}
          placeholder="URL"
        />
        <Button
          disabled={newItemValue.isFetching || newItemValue.text === ''}
          className={styles.newUrlFormControl}
          htmlType="submit"
        >
          {"Add"}
        </Button>
      </form>
    </div>
  );
}
