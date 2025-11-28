// **플로우:**
// 1. 백엔드에서 Presigned URL 받음
//    → "이 URL로 5분 안에 업로드하면 허용해줄게"

// 2. 프론트엔드가 S3에 직접 PUT 요청
//    → fetch(presignedUrl, { method: "PUT", body: 파일 })
//    → 백엔드 안 거침! S3로 바로 감

// 3. S3가 파일 저장
//    → https://...amazonaws.com/파일명.png 에 저장됨

export async function uploadImage(file: File): Promise<string> {
  console.log("업로드 시작:", file.name);
  // Presigned URL 받기
  const res = await fetch("/api/images", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: file.name }),
  });

  if (!res.ok) {
    throw new Error("Presigned URL 받기 실패");
  }

  const data = await res.json();
  console.log("백엔드 응답:", data);

  const presignedUrl = data.item.url;
  console.log("Presigned URL:", presignedUrl);

  // S3에 업로드 (백엔드 거치지 않음!)
  const uploadRes = await fetch(presignedUrl, {
    method: "PUT", // PUT 메서드 (S3 업로드는 PUT)
    body: file, // 파일 자체를 body에 담음
    headers: { "Content-Type": file.type }, // 이미지 타입 (image/png, image/jpeg 등)
  });

  if (!uploadRes.ok) {
    throw new Error("이미지 업로드 실패");
  }

  // URL에서 쿼리스트링 제거
  const url = new URL(presignedUrl);
  return `${url.origin}${url.pathname}`;
}
