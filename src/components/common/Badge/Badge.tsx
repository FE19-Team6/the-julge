import clsx from "clsx";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import ArrowUpIcon from "@/src/assets/arrow-badge.svg";

export type BadgeVariant =
  | "increase"
  | "middle"
  | "ended"
  | "success"
  | "pending";

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
  success: "bg-blue-10 text-blue-20",
  pending: "bg-red-10 text-red-40",
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
