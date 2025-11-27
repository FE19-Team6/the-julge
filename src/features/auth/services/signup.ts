import { api } from "@/lib/axios";
import type { SignupPayload } from "@/src/features/auth/type";


// 회원가입 버튼을 누르면 api.post() 실행됨
export const signup = async (payload: SignupPayload) => {

  const res = await api.post("/users", payload);
  return res.data;
};
