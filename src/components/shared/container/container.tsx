import React from "react";

import styles from "./container.module.scss";

export const Container: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
