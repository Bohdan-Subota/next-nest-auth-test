"use client";
import React from "react";

interface IProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "violet";
}

const Button: React.FC<IProps> = ({
  children,
  onClick,
  variant = "default",
}) => {
  const baseStyles =
    "inline-flex py-2 px-5 items-center justify-center rounded shadow-md cursor-pointer";

  const variantStyles =
    variant === "violet"
      ? "bg-violet-600 text-white hover:bg-violet-700"
      : "bg-card text-copy-primary hover:bg-background";

  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} transition-colors duration-300`}
    >
      {children}
    </div>
  );
};

export default Button;
