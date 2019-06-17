import React, { FormEvent } from "react";
import { Button, Input, Select } from "antd";
import styles from "./index.module.less";

export interface NewItemState {
  text: string;
  tags: string[];
  isFetching: boolean;
}

interface Props {
  newItemValue: NewItemState;
  onChangeNewItemTags: (tags: string[]) => void;
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
        <Select
          mode="tags"
          placeholder="Tags (comma separated)"
          value={props.newItemValue.tags}
          onChange={(value: string[]) => {
            props.onChangeNewItemTags(value);
          }}
          tokenSeparators={[","]}
          className={styles.newUrlFormControl}
        />
        <Button
          disabled={newItemValue.isFetching || newItemValue.text === ""}
          className={styles.newUrlFormControl}
          htmlType="submit"
        >
          {"Add"}
        </Button>
      </form>
    </div>
  );
}
