"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BellIcon from "@/src/assets/vector.svg";

export interface RightMenuProps {
  userType: "employee" | "employer" | undefined;
}
const RightMenu = ({ userType }: RightMenuProps) => {
  const router = useRouter();
  // 추가: 로그아웃 핸들러
  const handleLogout = async () => {
    // TODO: 실제 로그아웃 API 호출
    console.log("logout");
    // await fetch("/api/auth/logout", { method: "POST" });
    // router.push("/login");
  };

  // 추가: 알림 핸들러
  const handleOpenNotification = () => {
    // TODO: 알림 모달/드로어 열기
    console.log("open notification");
  };

  return (
    <div className="flex items-center gap-6 text-gray-700">
      {/* 사장님 로그인 */}
      {userType === "employer" && (
        <>
          <Link href="/mystore" className="text-sm hover:text-black transition">
            내 가게
          </Link>

          <button
            onClick={handleLogout}
            className="text-sm hover:text-black transition"
          >
            로그아웃
          </button>

          <button
            onClick={handleOpenNotification}
            className="hover:opacity-70 transition"
          >
            <BellIcon className="w-6 h-6" />
          </button>
        </>
      )}

      {/* 알바 로그인 */}
      {userType === "employee" && (
        <>
          <Link href="/profile" className="text-sm hover:text-black transition">
            내 프로필
          </Link>

          <button
            onClick={handleLogout}
            className="text-sm hover:text-black transition"
          >
            로그아웃
          </button>

          <button
            onClick={handleOpenNotification}
            className="hover:opacity-70 transition"
          >
            <BellIcon className="w-6 h-6" />
          </button>
        </>
      )}

      {/* 비로그인 */}
      {userType === undefined && (
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
