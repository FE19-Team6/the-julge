"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/src/features/auth/services/authService";
import Link from "next/link";
import BellIcon from "@/src/assets/vector.svg";
import NotificationModal from "../Noitfication/NotificationModal";
import { useNotifications } from "@/src/features/notification/hooks/useNotifications";

export interface RightMenuProps {
  userType: "employee" | "employer" | undefined;
}

const RightMenu = ({ userType }: RightMenuProps) => {
  const router = useRouter();
  // 알림 모달 오픈 여부
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // 로그인 상태일 때만 훅 실행
  const notificationData = userType
    ? useNotifications()
    : { notifications: [], unreadCount: 0, markAllAsRead: () => {} };

  // 알림 목록, 읽지 않은 갯수, 읽은알람
  const { notifications, unreadCount, markAllAsRead } = notificationData;

  // 모달 열림
  const handleNotificationOpen = () => {
    setIsNotificationOpen(true);
  };

  // 모달 닫을 때 읽음 처리
  const handleNotificationClose = () => {
    setIsNotificationOpen(false);
    if (unreadCount > 0) {
      markAllAsRead();
    }
  };

  // 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      await authService.logout();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃에 실패했습니다.");
    }
  };

  return (
    <div className="flex items-center gap-6 text-gray-700 relative">
      {/* 사장님 */}
      {userType === "employer" && (
        <Link href="/mystore" className="text-sm hover:text-black transition">
          내 가게
        </Link>
      )}

      {/* 알바생 */}
      {userType === "employee" && (
        <Link href="/profile" className="text-sm hover:text-black transition">
          내 프로필
        </Link>
      )}

      {/* 로그인 상태 - 로그아웃 & 알림 */}
      {userType && (
        <>
          <button
            onClick={handleLogout}
            className="text-sm hover:text-black transition cursor-pointer"
          >
            로그아웃
          </button>
          <button
            onClick={handleNotificationOpen}
            className="hover:opacity-70 transition relative cursor-pointer"
          >
            {/* 안 읽은 갯수 표시 */}
            <BellIcon className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          {/* 알림 모달 */}
          <NotificationModal
            open={isNotificationOpen}
            onClose={handleNotificationClose}
            items={notifications}
          />
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
