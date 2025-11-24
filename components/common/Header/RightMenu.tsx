"use client";

import Link from "next/link";
import BellIcon from "@/src/assets/vector.svg";

export interface RightMenuProps {
  state: "employer" | "employee" | null;
  onLogout: () => void;
  onOpenNotification: () => void;
}

export default function RightMenu({
  state,
  onLogout,
  onOpenNotification,
}: RightMenuProps) {
  if (state === "employer") {
    return (
      <div className="flex items-center gap-10 text-black">
        <Link href="/storeInfoDetail" className="text-sm hover:opacity-80">
          내 가게
        </Link>

        <button onClick={onLogout} className="text-sm hover:opacity-80">
          로그아웃
        </button>

        <button onClick={onOpenNotification} className="hover:opacity-80">
          <BellIcon className="w-6 h-6" />
        </button>
      </div>
    );
  }

  if (state === "employee") {
    return (
      <div className="flex items-center gap-10 text-black">
        <Link href="/profile" className="text-sm hover:opacity-80">
          내 프로필
        </Link>

        <button onClick={onLogout} className="text-sm hover:opacity-80">
          로그아웃
        </button>

        <button onClick={onOpenNotification} className="hover:opacity-80">
          <BellIcon className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-10 text-black">
      <Link href="/login" className="text-sm hover:opacity-80">
        로그인
      </Link>

      <Link href="/signup" className="text-sm hover:opacity-80">
        회원가입
      </Link>
    </div>
  );
}
