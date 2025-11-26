import { AxiosError } from "axios";

// HTTP 상태 코드별 에러 메시지
export const ERROR_MESSAGES: Record<number, string> = {
  400: "잘못된 요청입니다.",
  401: "로그인이 필요합니다.",
  403: "접근 권한이 없습니다.",
  404: "요청한 리소스를 찾을 수 없습니다.",
  408: "요청 시간이 초과되었습니다.",
  500: "서버 오류가 발생했습니다.",
};

// 에러 객체에서 메시지 추출
export const getErrorMessage = (err: unknown): string => {
  if (!(err instanceof AxiosError)) {
    return "알 수 없는 오류가 발생했습니다.";
  }

  const status = err.response?.status;
  const serverMessage = err.response?.data?.message;

  // 네트워크 에러 (서버응답 없음)
  if (!status) {
    return "네트워크 연결을 확인해주세요.";
  }

  // 서버 메시지 > 기본 메시지 > 일반 메시지 순으로 반환
  return serverMessage || ERROR_MESSAGES[status] || "오류가 발생했습니다.";
};

// 에러의 HTTP 상태 코드 추출
export const getErrorStatus = (err: unknown): number | null => {
  if (err instanceof AxiosError) {
    return err.response?.status || null;
  }
  return null;
};
