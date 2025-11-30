import { useState, useEffect } from "react";
import { notificationService } from "../services/notificationService";
import { Notification } from "@/src/components/common/Noitfication/NotificationModal";

// API 응답 타입 정의
interface NotificationItemWrapper {
  item: {
    id: string;
    createdAt: string;
    shop: {
      item: {
        name: string;
      };
    };
    notice: {
      item: {
        startsAt: string;
      };
    };
    result: string;
    read: boolean;
  };
}

interface NotificationsResponse {
  items: NotificationItemWrapper[];
}

export function useNotifications() {
  //목록
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 알림 가져오기
  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      // /api/notifications GET 요청, service에 함수있음
      const data: NotificationsResponse =
        await notificationService.getNotifications();

      // API 응답을 Notification 타입으로 변환
      const transformed: Notification[] = data.items.map((wrapper) => ({
        id: wrapper.item.id,
        createdAt: wrapper.item.createdAt,
        shopName: wrapper.item.shop.item.name,
        noticeTime: wrapper.item.notice.item.startsAt,
        result: wrapper.item.result as "accepted" | "rejected",
        read: wrapper.item.read,
      }));

      setNotifications(transformed);
    } catch (error) {
      console.error("알림 조회 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //모달 열때마다 전체 읽음처리
  const markAllAsRead = async () => {
    try {
      const unreadIds = notifications.filter((n) => !n.read).map((n) => n.id);
      await Promise.all(
        unreadIds.map((id) => notificationService.markAsRead(id))
      );
      setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
    } catch (error) {
      console.error("알림 읽음 처리 실패:", error);
    }
  };

  // 최초 한번 알림 조회
  useEffect(() => {
    fetchNotifications();
  }, []);

  // 안 읽은 알림 개수 계산
  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    notifications,
    isLoading,
    unreadCount,
    markAllAsRead,
    refetch: fetchNotifications,
  };
}
