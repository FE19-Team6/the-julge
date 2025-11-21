"use client";

//import clsx from "clsx";
import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
//import { BUTTON_VARIANTS, BUTTON_SIZES } from "./buttonVariants";

export type ButtonProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  variant?: "primary" | "outline" | "disabled";
  size?: "lg" | "md" | "sm";
} & ComponentPropsWithoutRef<T>;

const Button = <T extends ElementType = "button">({
  as,
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: ButtonProps<T>) => {
  const Component = as || "button";
  return (
    <Component
      {...rest}
      //className={clsx(BUTTON_VARIANTS[variant], BUTTON_SIZES[size], className)}
    >
      {children}
    </Component>
  );
};

export default Button;
