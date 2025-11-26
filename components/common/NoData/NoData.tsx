"use client";

import { ReactNode } from "react";
import clsx from "clsx";

interface NoDataProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export default function NoData({
  title,
  description,
  action,
  className,
}: NoDataProps) {
  return (
    <div
      className={clsx(
        "w-full bg-white border border-gray-200 rounded-xl py-16 px-6 flex flex-col items-center text-center",
        className
      )}
    >
      <p className="text-black text-lg font-medium mb-2">{title}</p>
      {description && (
        <p className="text-gray-500 text-sm mb-6">{description}</p>
      )}
      {action && <div className="flex justify-center">{action}</div>}
    </div>
  );
}
