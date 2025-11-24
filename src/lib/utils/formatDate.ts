/**
 * 날짜 문자열을 사람이 읽기 좋은 "YYYY-MM-DD HH:mm" 형태로 변환합니다.
 */
export function formatDate(dateString: string) {
  const d = new Date(dateString);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hour = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hour}:${min}`;
}
