import { ComponentPropsWithoutRef, ElementType, useId } from "react";
import clsx from "clsx";

export type InputProps<T extends ElementType> = {
  as?: T;
  label: string;
  error?: string;
  suffix?: string;
} & ComponentPropsWithoutRef<T>;

const Input = <T extends ElementType = "input">({
  as,
  label,
  error,
  suffix,
  id,
  className,
  ...rest
}: InputProps<T>) => {
  const Component = as || "input";
  const autoId = useId();
  const inputId = id || autoId;

  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={inputId} className="text-sm font-medium">
        {label}
      </label>

      <div
        className={clsx(
          "flex items-center bg-white border rounded-lg px-4 h-14",
          error ? "border-red-500" : "border-gray-300",
          className
        )}
      >
        <Component id={inputId} {...rest} className="w-full outline-none" />

        {suffix && <span className="text-black ml-2">{suffix}</span>}
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default Input;
