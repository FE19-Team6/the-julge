import { directApi } from "@/lib/api/axios/axios";
import type { SignupPayload } from "@/src/features/auth/type";
import { AxiosError } from "axios";

export const signup = async (payload: SignupPayload) => {
  try {
    const res = await directApi.post("/users", payload);
    return res.data;
  } catch (error: unknown) {
    // AxiosError 인지 확인해서 ts 안전하게 타입 좁히기)
    if (error instanceof AxiosError) {
      const status = error.response?.status;

      // 409 Conflict (중복 이메일 체크함)
      if (status === 409) {
        throw new Error("이미 사용중인 이메일입니다.");
      }

      // 다른 서버 에러가 있는지 체크함
      const message =
        error.response?.data?.message || "회원가입에 실패했습니다.";
      throw new Error(message);
    }

    // AxiosError가 아닌 경우 (네트워크 오류 등)
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};
