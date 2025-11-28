import { directApi } from "@/lib/api/axios/axios";
import type { SignupPayload } from "@/src/features/auth/type";
import { AxiosError } from "axios";

export const signup = async (payload: SignupPayload) => {
  try {
    const res = await directApi.post("/users", payload);
    return res.data;

  } catch (error: unknown) {
    // AxiosError 인지 확인
    if (error instanceof AxiosError) {
      const status = error.response?.status;

      // 409 → 이메일 중복
      if (status === 409) {
        throw new Error("DUP");    
      }

      // 500, 400 등 기타 서버 에러
      throw new Error("FAIL");   
    }

    // Axios 에러가 아닌 기타 네트워크 오류
    throw new Error("FAIL");
  }
};
