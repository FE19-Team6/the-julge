/*
- 사용자 프로필 업데이트 함수
- 업데이트 할 프로필 정보: 이름*, 전화번호*, 선호하는 지역, 자기소개
*/

export async function updateProfile(payload: {
  name: string;
  phone: string;
  address: string;
  bio: string;
}) {

  // Next.js API 라우트 (/api/profile)로 PUT 요청 전송함 
  const res = await fetch("/api/profile", {
    method: "PUT",

    // 쿠키 (token, userId)를 자동으로 함께 보냄
    credentials: "include", 
    headers: {
      "Content-Type": "application/json",
    },

    // payload 객체를 JSON 문자열로 반환하여 전송함
    body: JSON.stringify(payload),
  });

  // 서버 응답을 JSON으로 파싱함
  const data = await res.json();

  // 실패한 응답 처리
  if (!res.ok) {
    // 서버에서 보낸 에러 메시지나 기본 메시지를 사용하여 에러 throw함
    throw new Error(data.message || "프로필 업데이트 실패");
  }

  // 성공일 때만 반환함
  return data; 
}
