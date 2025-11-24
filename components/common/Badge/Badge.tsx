import clsx from "clsx";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import ArrowUpIcon from "@/src/assets/arrow-up.svg";

export type BadgeVariant = "increase" | "middle" | "ended";

export type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  children: ReactNode;
  variant?: BadgeVariant;
};

const BADGE_BASE = `
  inline-flex items-center justify-center
  w-fit h-9
  px-4 rounded-full
`;

const BADGE_VARIANTS = {
  increase: "bg-red-40 text-white",
  middle: "bg-red-20 text-white",
  ended: "bg-gray-20 text-white opacity-80",
} as const;

const Badge = ({
  children,
  variant = "increase",
  className,
  ...rest
}: BadgeProps) => {
  return (
    <span
      {...rest}
      className={clsx(BADGE_BASE, BADGE_VARIANTS[variant], className)}
    >
      {children}

      <ArrowUpIcon />
    </span>
  );
};

export default Badge;
