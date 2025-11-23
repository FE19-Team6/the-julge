// lib/axios.ts
import axios, { 
  AxiosInstance, 
  InternalAxiosRequestConfig, 
  AxiosError, 
  AxiosResponse 
} from 'axios';
import { tokenStorage } from '@/lib/tokenStorage';
import { handleUnauthorized } from '@/lib/utils/errorHandler';  

// axios 인스턴스 생성
export const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (토큰 자동 추가)
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.get();
    
    if (token && config.headers) {  
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// 응답 인터셉터 (공통 에러 처리)
api.interceptors.response.use(
  (res: AxiosResponse) => res,
  (err: AxiosError) => {  
    const originalRequest = err.config as InternalAxiosRequestConfig & { 
      _retry?: boolean 
    };

    // 401만 자동 처리 (로그아웃) 무한루프 방지   
    if (err.response?.status === 401 && 
      typeof window !== 'undefined' &&
    !originalRequest._retry) {
      originalRequest._retry = true;
      handleUnauthorized();
    }
    
    // 나머지는 errorHandler 컴포넌트에서 처리
    return Promise.reject(err);
  }
);