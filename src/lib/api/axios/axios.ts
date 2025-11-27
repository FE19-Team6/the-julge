//호출부에서 사용

import axios, { AxiosInstance, AxiosError } from "axios";

// Next.js API Route용
export const api: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 10000,
  withCredentials: true, // 쿠키 자동 전송
  headers: {
    "Content-Type": "application/json",
  },
});

// 백엔드 직접 호출용
export const directApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 공통 응답 인터셉터 (함수 자체, 호출 X)
const responseInterceptor = (error: AxiosError) => {
  const status = error.response?.status;

  if (status === 401) {
    if (
      typeof window !== "undefined" &&
      !window.location.pathname.includes("/login")
    ) {
      window.location.href = "/login";
    }
  }

  return Promise.reject(error);
};

// 인터셉터 적용
api.interceptors.response.use((res) => res, responseInterceptor);
directApi.interceptors.response.use((res) => res, responseInterceptor);
