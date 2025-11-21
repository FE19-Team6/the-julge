"use client";

import React from "react";

interface InputProps {
  label: string;
  type?: string;
  value: string;
  placeholder?: string;
  error?: string;
  suffix?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  label,
  type = "text",
  value,
  placeholder,
  error,
  suffix,
  onChange,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium">{label}</label>

      <div
        className={`flex items-center bg-white border rounded-lg px-4 h-14
        ${error ? "border-red-500" : "border-gray-300"}
      `}
      >
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full outline-none"
        />

        {suffix && <span className="text-black ml-2">{suffix}</span>}
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default Input;
