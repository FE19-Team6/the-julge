// app/not-found.tsx

import Link from "next/link";
import Button from "@/src/components/common/Button/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-[120px] font-bold text-gray-300">404</h1>
      <h2 className="text-h2 text-gray-700 mb-4">페이지를 찾을 수 없습니다</h2>
      <p className="text-body1 text-gray-500 mb-8">
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
      </p>
      <Link href="/">
        <Button variant="primary" size="lg">
          홈으로 돌아가기
        </Button>
      </Link>
    </div>
  );
}
