import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

export type TextAreaProps = ComponentPropsWithoutRef<"textarea"> & {
  error?: boolean;
};

const TEXTAREA_BASE = `
  w-full
  min-h-[153px]
  px-5 py-4
  rounded-[5px]
  border border-gray-30
  bg-white
  text-[var(--text-body2)] font-[var(--weight-body2)] text-black
  resize-none
  placeholder:text-gray-30
  focus:outline-none
  transition-colors duration-150
  scrollbar 
`;

const TEXTAREA_COLOR = {
  default: "focus:border-gray-30",
  error: "border-red-50 focus:border-red-50",
};

const Textarea = ({ error, className, ...rest }: TextAreaProps) => {
  return (
    <textarea
      {...rest}
      className={clsx(
        TEXTAREA_BASE,
        error ? TEXTAREA_COLOR.error : TEXTAREA_COLOR.default,
        className
      )}
    />
  );
};

export default Textarea;
