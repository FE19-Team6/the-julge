import { useState, useEffect } from "react";
import { notificationService } from "../services/notificationService";
import { Notification } from "@/src/components/common/Noitfication/NotificationModal";

// 추후 삭제:목업 데이터
const MOCK_DATA: Notification[] = [
  {
    id: "1",
    createdAt: "2024-03-20T10:00:00Z",
    shopName: "스타벅스 강남점",
    noticeTime: "2024-03-25T09:00:00Z",
    result: "accepted",
    read: false,
  },
  {
    id: "2",
    createdAt: "2024-03-19T15:30:00Z",
    shopName: "투썸플레이스 신촌점",
    noticeTime: "2024-03-24T14:00:00Z",
    result: "rejected",
    read: false,
  },
  {
    id: "3",
    createdAt: "2024-03-18T11:20:00Z",
    shopName: "커피빈 홍대점",
    noticeTime: "2024-03-23T10:00:00Z",
    result: "accepted",
    read: true,
  },
];

export function useNotifications() {
  //목록
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 알림 가져오기
  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      //  추후 삭제: API 호출 대신 목업 데이터 사용
      await new Promise((resolve) => setTimeout(resolve, 500)); // 로딩 시뮬레이션
      setNotifications(MOCK_DATA);

      // 실제 API 사용 시 주석 해제
      // // /api/notifications GET 요청, service에 함수있음
      // const data = await notificationService.getNotifications();

      // // API 응답을 Notification 타입으로 변환
      // const transformed: Notification[] = data.items.map((wrapper: any) => ({
      //   id: wrapper.item.id,
      //   createdAt: wrapper.item.createdAt,
      //   shopName: wrapper.item.shop.item.name,
      //   noticeTime: wrapper.item.notice.item.startsAt,
      //   result: wrapper.item.result,
      //   read: wrapper.item.read,
      // }));

      // setNotifications(transformed);
    } catch (error) {
      console.error("알림 조회 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //모달 열때마다 전체 읽음처리
  const markAllAsRead = async () => {
    try {
      // 추후 삭제: API 호출 대신 상태만 변경
      setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));

      // 실제 API 사용 시 주석 해제
      // const unreadIds = notifications.filter((n) => !n.read).map((n) => n.id);
      // await Promise.all(unreadIds.map((id) => notificationService.markAsRead(id)));
      // setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
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
