import { ReactNode } from "react";
import clsx from "clsx";

interface NoDataProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export default function NoData({
  title,
  description,
  action,
  className,
  titleClassName,
  descriptionClassName,
}: NoDataProps) {
  return (
    <div
      className={clsx(
        "w-full bg-white border border-gray-200 rounded-xl py-16 px-6 flex flex-col items-center text-center",
        className
      )}
    >
      <p
        className={clsx("text-black text-lg font-medium mb-2", titleClassName)}
      >
        {title}
      </p>

      {description && (
        <p className={clsx("text-gray-500 text-sm mb-6", descriptionClassName)}>
          {description}
        </p>
      )}
      {action && <div className="flex justify-center">{action}</div>}
    </div>
  );
}
