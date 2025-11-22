"use client";

import clsx from "clsx";
import { useState, KeyboardEvent } from "react";
import SearchIcon from "@/src/assets/search.svg";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    onSearch: (query: string) => void;
    placeholder?: string;
    size?: SearchSize; // 웹, 태블릿, 모바일 대응
}

type SearchSize = "web" | "tablet" | "mobile";

const SEARCH_SIZE = {
  web: "w-[450px] h-[40px] text-body2",
  tablet: "w-[360px] h-[38px] text-body2",
  mobile: "w-[335px] h-[36px] text-description",
} as const;

export default function SearchInput( 
    {value, onChange, onSearch, placeholder="가게 이름으로 찾아보세요", size="web"} : SearchInputProps ) {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
        onSearch(value);
    }
  };

  return (
    <div className="relative w-full max-w-[450px]">
      {/* 인풋 영역 */}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={()=> setIsFocused(true)}
        onBlur={()=> setIsFocused(false)}
        placeholder={placeholder}
        className={clsx(
        "bg-gray-10 rounded-[8px]",
        "pl-12 pr-4 transition-all",
        "placeholder:text-gray-40 text-body2",
        "outline-none border", 
        
        SEARCH_SIZE[size],

        isFocused 
            ? "border-gray-50 ring-1 ring-gray-100" 
            : "border-transparent" 
        )}
      />

        {/* 돋보기 아이콘 */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => onSearch(value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch(value);
          }}
          className={clsx(
            "absolute left-4 top-1/2 -translate-y-1/2",
            "cursor-pointer"
          )}
         >
          <SearchIcon className="text-gray-40" />
        </div>
    </div>
  );
}
