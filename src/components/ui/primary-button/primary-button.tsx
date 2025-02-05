import React from "react";

import clsx from "clsx";

import styles from "./primary-button.module.scss";

interface IButtonPrimaryProps {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  mBottom?: number;
  mTop?: number;
  disabled?: boolean;
  width?: number;
  height?: number;
  bgColor?: string;
  border?: string;
  icon?: string;
  fWeight?: number;
  fSize?: number;
}

export const ButtonPrimary: React.FC<IButtonPrimaryProps> = ({
  label,
  onClick,
  mBottom,
  mTop,
  disabled = false,
  height,
  width,
  bgColor,
  border,
  icon,
  fWeight,
  fSize,
}) => {
  return (
    <button
      className={clsx(styles.primaryButton, disabled && styles.disabled)}
      onClick={onClick}
      style={{
        marginTop: mTop,
        marginBottom: mBottom,
        height,
        width,
        background: bgColor,
        border,
        fontWeight: fWeight,
        fontSize: fSize,
      }}
      disabled={disabled}
    >
      {icon && <img src={icon} alt="Icon" />}
      {label}
    </button>
  );
};
