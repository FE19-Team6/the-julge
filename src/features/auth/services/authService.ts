import { api } from "@/src/lib/api/axios/axios";
import { LoginResponse } from "../type";

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post<LoginResponse>("/login", {
      email,
      password,
    });

    // API 응답을 도메인 타입으로 변환
    return {
      token: response.data.item.token,
      user: response.data.item.user.item,
    };
  },

  logout: async () => {
    const response = await api.post("/logout");
    return response.data;
  },
};
