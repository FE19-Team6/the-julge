"use client";

import clsx from "clsx";
import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { BUTTON_VARIANTS, BUTTON_SIZES, BUTTON_BASE } from "./buttonVariants";

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  children: ReactNode;
  variant?: "primary" | "outline" | "disabled";
  size?: "lg" | "md" | "sm" | "full";
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      className={clsx(
        BUTTON_BASE,
        BUTTON_VARIANTS[variant],
        BUTTON_SIZES[size],
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
