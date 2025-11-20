"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Logo from "@/src/assets/logo.svg";
import SearchIcon from "@/src/assets/search.svg";
import BellIcon from "@/src/assets/vector.svg";

interface HeaderProps {
  state: "registering" | "login" | "signup";
  onLogout: () => void;
  onOpenNotification: () => void;
}

const Header = ({ state, onLogout, onOpenNotification }: HeaderProps) => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim()) {
      router.push(`/search?keyword=${search}`);
    }
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
          <SearchIcon className="w-5 h-5 text-gray-400 mr-3" />
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
      <div className="flex items-center gap-6 text-gray-700">
        {state === "registering" ? (
          <>
            <Link
              href="/storeInfoDetail"
              className="text-sm hover:text-black transition"
            >
              내 가게
            </Link>

            <button
              onClick={onLogout}
              className="text-sm hover:text-black transition"
            >
              로그아웃
            </button>

            <button
              onClick={onOpenNotification}
              className="hover:opacity-70 transition"
            >
              <BellIcon className="w-6 h-6" />
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm hover:text-black transition">
              로그인
            </Link>

            <Link
              href="/signup"
              className="text-sm hover:text-black transition"
            >
              회원가입
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
