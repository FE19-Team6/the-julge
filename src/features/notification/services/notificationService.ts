import { api } from "@/src/lib/api/axios/axios";

export const notificationService = {
  // 알림 목록 조회
  getNotifications: async () => {
    const response = await api.get("/notifications");
    return response.data;
  },

  // 알림 읽음 처리
  markAsRead: async (alertId: string) => {
    const response = await api.put("/notifications/${alertId}");
    return response.data;
  },
};
