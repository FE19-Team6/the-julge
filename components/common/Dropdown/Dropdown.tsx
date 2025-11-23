"use client";

import { useState, useId, ComponentPropsWithoutRef, ElementType } from "react";
import clsx from "clsx";

import ArrowDown from "@/src/assets/arrow-down.svg";
import ArrowUp from "@/src/assets/arrow-up.svg";

export type DropdownOption = {
  label: string;
  value: string;
};

export type DropdownProps<T extends ElementType = "div"> = {
  as?: T;
  label: string;
  value?: string;
  options: DropdownOption[];
  placeholder?: string;
  error?: string;
  onChangeValue: (value: string) => void;
  className?: string;
} & ComponentPropsWithoutRef<T>;

const Dropdown = <T extends ElementType = "div">({
  as,
  label,
  value,
  options,
  placeholder = "선택하세요",
  error,
  onChangeValue,
  className,
  id,
  ...rest
}: DropdownProps<T>) => {
  const Component = (as || "div") as "div";
  const autoId = useId();
  const dropdownId = id || autoId;

  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((o) => o.value === value);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (v: string) => {
    onChangeValue(v);
    setIsOpen(false);
  };

  return (
    <Component
      {...rest}
      className={clsx("w-full flex flex-col relative", className)}
    >
      <label
        htmlFor={dropdownId}
        className="text-body2 font-medium text-black mb-1"
      >
        {label}
      </label>

      <button
        id={dropdownId}
        type="button"
        onClick={toggleOpen}
        className={clsx(
          "relative flex items-center justify-between w-full px-4 h-14 rounded-[10px] border bg-white text-left transition text-body2",
          error ? "border-red-50" : "border-gray-30 hover:border-gray-40"
        )}
      >
        <span className={clsx(selectedOption ? "text-black" : "text-gray-40")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        {isOpen ? (
          <ArrowUp className="w-4 h-4 text-black" />
        ) : (
          <ArrowDown className="w-4 h-4 text-black" />
        )}
      </button>

      {isOpen && (
        <div
          className="
            absolute
            top-full
            left-0
            mt-1
            w-full
            bg-white
            border border-gray-30
            rounded-[10px]
            shadow-md
            z-50
          "
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={clsx(
                "w-full text-left px-4 py-3 text-body2 text-black transition",
                opt.value === value
                  ? "bg-gray-10 font-medium"
                  : "hover:bg-gray-10 rounded-[10px]"
              )}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {error && <p className="mt-1 text-caption text-red-50">{error}</p>}
    </Component>
  );
};

export default Dropdown;
