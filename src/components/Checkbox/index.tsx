import classNames from "classnames";
import React from "react";
import Icon from "../Icon";
import styles from "./index.module.css";

export default function Checkbox(props: {
  isActive: boolean,
  label: string,

  onTrigger?(): void
}) {

  /* DOM */
  return (
    <div className={styles.Checkbox} onClick={() => props.onTrigger?.()}>
      <Icon
        icon={props.isActive ? "check-mark-square-filled" : "square-lined"}
        className={classNames({isActive: props.isActive})}
      />

      <span>{props.label}</span>
    </div>
  );
}
