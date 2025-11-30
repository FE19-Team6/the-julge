import Button from "@/src/components/common/Button/Button"
import Link from "next/link"

// Profile Main Page
// 사용자가 자신의 프로필을 관리할 수 있는 시작 페이지
// 프로필이 없을 때 등록 안내 및 등록 버튼을 렌더링함
export default function Page() {
  return (
    <div className="w-full mt-15">
        <div className="w-full max-w-[964px] mx-auto px-4 md:px-6 lg:px-0 space-y-8">
          <h1 className="text-h2">내 프로필</h1>
          <div className="flex items-center justify-center h-[217px] border border-gray-20">
            <div className="flex flex-col items-center gap-5">
              <p> 내 프로필을 등록하고 원하는 가게에 지원해 보세요! </p>
              <Link href="/profile/create">
                <Button variant="primary" size="lg">내 프로필 등록하기</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    
  )
}
