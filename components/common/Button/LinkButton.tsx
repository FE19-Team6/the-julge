import clsx from "clsx";
import Link from "next/link";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { BUTTON_VARIANTS, BUTTON_SIZES, BUTTON_BASE } from "./buttonVariants";

export type LinkButtonProps = ComponentPropsWithoutRef<typeof Link> & {
  children: ReactNode;
  variant?: "primary" | "outline" | "disabled";
  size?: "lg" | "md" | "sm" | "full";
};

const LinkButton = ({
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: LinkButtonProps) => {
  return (
    <Link
      {...rest}
      className={clsx(
        BUTTON_BASE,
        BUTTON_VARIANTS[variant],
        BUTTON_SIZES[size],
        className
      )}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
