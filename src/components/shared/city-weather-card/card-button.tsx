import React, { ReactNode } from "react";

import styles from "./city-weather-card.module.scss";

interface Props {
  img: ReactNode;
  bgColor: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const CardButton: React.FC<Props> = ({ img, bgColor, onClick }) => {
  return (
    <button
      className={styles.cardButton}
      style={{ backgroundColor: bgColor }}
      onClick={onClick}
    >
      {img}
    </button>
  );
};
