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