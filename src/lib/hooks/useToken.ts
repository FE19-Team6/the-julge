/**
 * 사용 예시:
 *
 * "use client";
 * import { useToken } from '@/src/lib/hooks/useToken';
 *
 * export default function MyComponent() {
 *   const { token, loading } = useToken();
 *
 *   if (loading) return <div>로딩...</div>;
 *   if (!token) return <div>로그인 필요</div>;
 *
 *   // token이 있을 때 - 여기서부터 실행됨
 *   // 예: API 호출
 *   fetch('https://api.com/data', {
 *     headers: { Authorization: `Bearer ${token}` }
 *   });
 *
 *   return <div>정상 화면</div>;
 * }
 */

import { useEffect, useState } from "react";

export function useToken() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/token")
      .then((res) => res.json())
      .then((data) => setToken(data.token))
      .catch(() => setToken(null))
      .finally(() => setLoading(false));
  }, []);

  return { token, loading };
}
