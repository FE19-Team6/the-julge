// localStorage에서 사용할 키 값
const TOKEN_KEY = 'auth_token';

// 토큰 가지고 오기 (SRR 환경에서는 null 반환)
export const tokenStorage = {
  get(): string | null {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  

  // 토큰 저장 (클라이언트 환경 여부 체크 후 localStorage에 저장)
  set(token: string): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {
      console.error('토큰 저장 실패');
    }
  },
  
  // 토큰 삭제
  remove(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      console.error('토큰 삭제 실패');
    }
  },
};