"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Logo from "@/src/assets/logo.svg";
import SearchIcon from "@/src/assets/search.svg";

import RightMenu from "./RightMenu";

type HeaderState = "owner" | "worker" | "guest";

interface HeaderProps {
  state: HeaderState;
  onLogout: () => void;
  onOpenNotification: () => void;
}

const Header = ({ state, onLogout, onOpenNotification }: HeaderProps) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const encoded = encodeURIComponent(search.trim());

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim()) {
      router.push(`/search?keyword=${encoded}`);
    }
  };

  const handleIconClick = () => {
    if (!search.trim()) return;
    router.push(`/search?keyword=${encoded}`);
  };

  return (
    <header className="w-full h-[70px] flex items-center justify-between px-10 bg-white">
      {/* 로고 */}
      <Link href="/storeInfoDetail" className="cursor-pointer select-none">
        <Logo className="w-[108.851px] h-auto" />
      </Link>

      {/* 검색바 */}
      <div className="flex-1 flex justify-center px-10">
        <div className="w-full max-w-[450px] flex items-center bg-gray-100 rounded-[10px] px-4 h-11">
          <button onClick={handleIconClick}>
            <SearchIcon className="w-5 h-5 text-gray-400 mr-3" />
          </button>
          <input
            type="text"
            className="w-full bg-transparent outline-none text-gray-700"
            placeholder="가게 이름으로 찾아보세요"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
      </div>

      {/* 오른쪽 메뉴 */}
      <RightMenu
        state={state}
        onLogout={onLogout}
        onOpenNotification={onOpenNotification}
      />
    </header>
  );
};

export default Header;
