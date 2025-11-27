import { api } from "@/src/lib/api/axios/axios";

export async function uploadImage(file: File) {
  const presignedRes = await api.post("/images", { name: file.name });

  const json = presignedRes.data;

  const uploadUrl = json?.links?.[0]?.href;
  const finalFileUrl = json?.item?.url;

  if (!uploadUrl) {
    console.error("Presigned 응답:", json);
    throw new Error("Presigned URL 생성 실패");
  }

  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!uploadRes.ok) {
    throw new Error("이미지 업로드 실패");
  }

  return finalFileUrl;
}
