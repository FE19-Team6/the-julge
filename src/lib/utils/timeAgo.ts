/**
 * timeAgo
 * -----------------------------------------
 * 날짜 문자열을 받아서 "3분 전", "2시간 전", "1일 전"처럼
 * SNS 스타일의 상대적인 시간 텍스트로 변환해주는 함수입니다.
 *
 * - 알림(Notifications) UI
 *
 * "방금 전" ~ "몇 분 전" ~ "몇 시간 전" ~ "몇 일 전" ~ "몇 주 전"
 * "몇 달 전" ~ "몇 년 전" 까지 대응합니다.
 */

export function timeAgo(dateString: string) {
  const diff = Date.now() - new Date(dateString).getTime();

  const sec = Math.floor(diff / 1000);
  const min = Math.floor(sec / 60);
  const hour = Math.floor(min / 60);
  const day = Math.floor(hour / 24);
  const week = Math.floor(day / 7);
  const month = Math.floor(day / 30);
  const year = Math.floor(day / 365);

  if (sec < 60) return "방금 전";
  if (min < 60) return `${min}분 전`;
  if (hour < 24) return `${hour}시간 전`;
  if (day < 7) return `${day}일 전`;
  if (week < 5) return `${week}주 전`;
  if (month < 12) return `${month}개월 전`;
  return `${year}년 전`;
}
