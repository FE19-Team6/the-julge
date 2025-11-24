"use client";

import Link from "next/link";
import BellIcon from "@/src/assets/vector.svg";

export type HeaderState = "employer" | "employee" | "guest";

export interface RightMenuProps {
  state: HeaderState;
  onLogout: () => void;
  onOpenNotification: () => void;
}

const RightMenu = ({ state, onLogout, onOpenNotification }: RightMenuProps) => {
  return (
    <div className="flex items-center gap-6 text-gray-700">
      {/* 사장님 로그인 */}
      {state === "employer" && (
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
      )}

      {/* 알바 로그인 */}
      {state === "employee" && (
        <>
          <Link href="/profile" className="text-sm hover:text-black transition">
            내 프로필
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
      )}

      {/* 비로그인 */}
      {state === "guest" && (
        <>
          <Link href="/login" className="text-sm hover:text-black transition">
            로그인
          </Link>

          <Link href="/signup" className="text-sm hover:text-black transition">
            회원가입
          </Link>
        </>
      )}
    </div>
  );
};

export default RightMenu;
