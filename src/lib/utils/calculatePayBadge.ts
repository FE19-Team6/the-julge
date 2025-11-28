
// 숫자만 바꾸면 전체 로직 자동 반영되도록 상수처리 함
export const PAY_BADGE = {
  INCREASE: 50, // increase 뱃지
  MIDDLE: 30,  // middle 뱃지
  LOW: 0 // 뱃지 없음
} as const;

// 뱃지 종류
export type PayBadgeVariant = "increase" | "middle" | "ended";

// 최종 반환 타입 (null이면 뱃지 없음)
export type PayBadgeResult = {
  variant: PayBadgeVariant;
  label: string;
} | null;

// 시급 증가율에 따라 뱃지를 계산하는 함수
export const calculatePayBadge = (
  hourlyPay: number,
  originalHourlyPay: number
): PayBadgeResult => {
  // 증가율 계산 (퍼센트)
  const increaseRate =
    ((hourlyPay - originalHourlyPay) / originalHourlyPay) * 100;

  // 증가율이 0 이하이면 뱃지 없음
  if (increaseRate <= 0) return null;

  // 기준값 가져오기
  const { INCREASE, MIDDLE } = PAY_BADGE;

  let variant: PayBadgeVariant;

  // 증가율에 따라 뱃지를 결정
  if (increaseRate >= INCREASE) {
    variant = "increase";
  } else if (increaseRate >= MIDDLE) {
    variant = "middle";
  } else {
    variant = "ended";
  }

  // 카드에서 표시할 뱃지 텍스트 만들기
  return {
    variant,
    label: `기존 시급보다 ${Math.round(increaseRate)}%`,
  };
};
