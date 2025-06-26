import React from "react";

type Variant = "primary" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: Variant;
  icon?: React.ReactNode;
  text?: string;
  width?: string;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  icon,
  className = "",
  text,
  width,
  disabled,
  type = "button",
  onClick,
}) => {
  const variants = {
    primary: "btn-primary",
    outline: "btn-outline",
  };

  const classes = `btn ${variants[variant]} ${width} ${className}`;

  return (
    <button
      className={classes}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {icon && <span className={text ? "mr-2" : "mr-0"}>{icon}</span>}
      {text}
    </button>
  );
};

export default Button;
