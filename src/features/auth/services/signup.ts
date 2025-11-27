import { directApi } from "@/lib/api/axios/axios";
import type { SignupPayload } from "@/src/features/auth/type";
import { AxiosError } from "axios";

export const signup = async (payload: SignupPayload) => {
  try {
    // 서버에 회원가입 요청 보내기
    const res = await directApi.post("/users", payload);
    return res.data;

  } catch (error) {
    // axios에서 발생한 에러인지 확인
    if (error instanceof AxiosError) {
      const status = error.response?.status;

      // 409 에러 : 이메일 중복 시 모달을 띄움
      if (status === 409) {
        throw new Error("DUP");
      }

      // axios는 맞는데 409가 아닌 다른 서버 에러 (예: 500, 400 등 - 일반 실패 모달)
      throw new Error("FAIL");
    }

    // axios 에러가 아닌 경우 (네트워크 끊김 등)
    throw new Error("FAIL");
  }
};
