// ============================
// 사용자 정보 타입
// ============================
export interface StoreUserItem {
  id: string;
  email: string;
  type: "employer" | "employee";
}

export interface StoreUser {
  href: string;
  item: StoreUserItem;
}

// ============================
// 가게 상세 정보 타입
// ============================
export interface StoreItem {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
  user: StoreUser;
}

// ============================
// 최종 백엔드 응답 타입
// ============================
export interface StoreDetailResponse {
  item: StoreItem;
  links: Array<{
    rel: string;
    description: string;
    method: string;
    href: string;
    body?: unknown;
    query?: unknown;
  }>;
}

// ============================
// Client Component 에 넘길 타입
// ============================
export interface FlattenedStoreDetail {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
  user: StoreUserItem; // ← 평탄화
}
