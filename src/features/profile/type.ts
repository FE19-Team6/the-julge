/**
 * 프로필 작성 내용
 */
export type UpdateProfilePayload = {
  name: string;
  phone: string;
  address: string;
  bio?: string;
};

/**
 * 신청 내역 (화면 표시용)
 */
export type Application = {
  id: string;
  shopName: string;
  workDate: string;
  workHour: number;
  hourlyPay: number;
  status: "pending" | "accepted" | "rejected" | "canceled";
};

// 🔥 Link 타입 정의
interface ApiLink {
  rel: string;
  description: string;
  method: string;
  href: string;
  body?: Record<string, unknown>;
  query?: Record<string, unknown>;
}

// API 응답
export interface UserApplicationApiResponse {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: Array<{
    item: {
      id: string;
      status: "pending" | "accepted" | "rejected" | "canceled";
      createdAt: string;
      shop: {
        item: {
          id: string;
          name: string;
          category: string;
          address1: string;
          address2: string;
          description: string;
          imageUrl: string;
          originalHourlyPay: number;
        };
        href: string;
      };
      notice: {
        item: {
          id: string;
          hourlyPay: number;
          description: string;
          startsAt: string;
          workhour: number;
          closed: boolean;
        };
      };
    };
    links: ApiLink[];
  }>;
  links: ApiLink[];
}
