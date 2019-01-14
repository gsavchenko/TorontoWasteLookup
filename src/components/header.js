import React from "react";
import styles from "./header.module.css";

export default ({ children }) => (
  <div className = {styles.header}  >
    {children}
  </div>
);
