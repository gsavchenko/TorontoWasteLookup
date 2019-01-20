import React from "react";
import styles from "../css/header.module.css";

export default ({ children }) => (
  <div className={styles.header}>{children}</div>
);
