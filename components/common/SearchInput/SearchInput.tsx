import clsx from "clsx";
import { useState, KeyboardEvent } from "react";
import SearchIcon from "@/src/assets/search.svg";

// props 타입 정의
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  placeholder?: string;
  size?: "web" | "tablet" | "mobile";
}

// 인풋 사이즈 크기별 input 및 wrapper 스타일
const SIZE_CONFIG = {
  web: {
    input: "w-[450px] h-[40px] text-body2",
    wrapper: "max-w-[450px]",
  },
  tablet: {
    input: "w-[360px] h-[38px] text-body2",
    wrapper: "max-w-[360px]",
  },
  mobile: {
    input: "w-[335px] h-[36px] text-description",
    wrapper: "max-w-[335px]",
  },
} as const;

export default function SearchInput({
  value,
  onChange,
  onSearch,
  placeholder = "가게 이름으로 찾아보세요",
  size = "web",
}: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);

// 공통 검색 로직
  const handleSearch = () => {
    const trimText = value.trim();
    if (!trimText) return;
    onSearch(trimText);
  };

  // input에서 Enter로 검색
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={clsx("relative w-full", SIZE_CONFIG[size].wrapper)}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        aria-label="검색어 입력"
        className={clsx(
          // 공통 스타일 
          "text-black bg-gray-10 rounded-[8px]",
          "pl-4 pr-12 transition-all outline-none border",
          "placeholder:text-gray-40",
          // 사이즈별 스타일 
          SIZE_CONFIG[size].input,
          // 포커스 스타일 
          isFocused 
            ? "border-gray-50 ring-1 ring-gray-100" 
            : "border-transparent"
          )}
      />

      {/* 버튼 클릭 시 검색 */}
      <button
        type="button"
        onClick={handleSearch}
        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-70 transition-opacity"
      >
        <SearchIcon className="w-5 h-5 text-gray-40" />
      </button>
    </div>
  );
}