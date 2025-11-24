"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Logo from "@/src/assets/logo.svg";
import SearchInput from "@/components/common/SearchInput/SearchInput";
import RightMenu from "./RightMenu";

export type HeaderState = "employer" | "employee";

export interface HeaderProps {
  state: HeaderState | null;
  onLogout: () => void;
  onOpenNotification: () => void;
}

export default function Header({
  state,
  onLogout,
  onOpenNotification,
}: HeaderProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (query: string) => {
    const keyword = encodeURIComponent(query.trim());
    if (!keyword) return;
    router.push(`/search?keyword=${keyword}`);
  };

  return (
    <header className="w-full h-[70px] flex items-center justify-between px-10 bg-white">
      {/* 로고 */}
      <Link href="/storeInfoDetail" className="cursor-pointer select-none">
        <Logo className="w-[108.851px] h-auto" />
      </Link>

      {/* 검색바 */}
      <div className="flex-1 flex justify-center px-10">
        <SearchInput
          value={search}
          onChange={setSearch}
          onSearch={handleSearch}
          size="web"
        />
      </div>

      {/* 오른쪽 메뉴 */}
      <RightMenu
        state={state}
        onLogout={onLogout}
        onOpenNotification={onOpenNotification}
      />
    </header>
  );
}
