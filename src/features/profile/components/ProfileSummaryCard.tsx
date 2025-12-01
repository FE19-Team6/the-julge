import Link from "next/link";
import Button from "@/src/components/common/Button/Button";
import PhoneIcon from "@/src/assets/phone.svg"
import LocationIcon from "@/src/assets/location.svg"

type ProfileSummaryCardProps = {
  profile: {
    name: string;
    phone: string;
    address: string;
    bio: string;
  };
};

/* 
- 프로필 요약 카드 컴포넌트
- 사용자 프로필 정보를 카드 형태로 표시
- 이름, 핸드폰번호, 선호 지역, 자기소개 표시 + 편집 버튼 포함
*/
export default function ProfileSummaryCard({ profile }: ProfileSummaryCardProps) {
  return (
    <div className="w-full">
      <div className="w-full">

        {/* 카드 전체 컨테이너 */}
        <div className="relative bg-red-10 p-5 rounded-xl">

          {/* 오른쪽 상단 버튼: absolute로 고정 */}
          <Link href="/profile/edit">
            <Button
              variant="outline"
              size="md"
              className="absolute top-10 right-8 cursor-pointer"
            >
              편집하기
            </Button>
          </Link>

          {/* 왼쪽 내용 전체 */}
          <div className="w-full">
            <p className="text-red-50 text-caption font-bold">이름</p>
            <p className="text-h1">{profile.name}</p>

            <div className="flex items-center mt-3 gap-1">
            <PhoneIcon className="w-[24px] h-[24px] [&_path]:fill-[#F48A71]" />
            <p className="text-black text-body1">{profile.phone}</p>
            </div>

            <div className="flex items-center mt-3 gap-2">
              <LocationIcon className=" [&_path]:fill-[#F48A71]" />
              <p className="text-black text-body1">
                선호지역: {profile.address}
              </p>
            </div>

            {/* 구분선 */}
            <div className="w-fullborder-l border border-[#FFDDD7] mt-5"></div>
            
            {/* 자기소개 */}
            <p className="text-gray-50 text-body2 mt-4 line-clamp-3">
              {profile.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
