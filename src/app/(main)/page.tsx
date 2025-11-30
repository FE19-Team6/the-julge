import { RecommendedJobsSection } from "@/src/features/jobs/components/jobList/RecommendedJobsSection";
import { AllJobsSection } from "./../../features/jobs/components/jobList/AllJobsSection";
import { getUserAddress } from "@/src/lib/utils/getCookies";
import { noticeService } from "@/src/features/jobs/services/getNotices";

export default async function MainPage({
  searchParams,
}: {
  searchParams: Promise<{
    keyword?: string;
    address?: string | string[];
    startsAtGte?: string;
    hourlyPayGte?: string;
    sort?: string;
  }>;
}) {
  const userAddress = (await getUserAddress()) ?? "";
  const params = await searchParams;
  const { keyword, address, startsAtGte, hourlyPayGte } = params;
  const sort = params.sort || "time";

  // 주소 여러개 올때 배열 처리
  const selectedAddresses = address
    ? Array.isArray(address)
      ? address // 이미 배열
      : address.split(",") // 문자열이면 split
    : [];

  //date 포맷 RFC 3339형식으로
  const validStartDate = startsAtGte
    ? `${startsAtGte}T00:00:00.000Z` // 🔥 RFC 3339 형식으로 변환
    : undefined;

  // 맞춤 공고 (주소 기반)
  const recommendedNotices = await noticeService.getNotice({
    limit: 3,
    offset: 0,
    address: userAddress,
  });

  // 전체 공고 (기본값)
  const allNotices = await noticeService.getNotice({
    limit: 6,
    offset: 0,
    sort,
    ...(keyword && { keyword }),
    ...(startsAtGte && { startsAtGte: validStartDate }),
    ...(hourlyPayGte && { hourlyPayGte: Number(hourlyPayGte) }),
  });

  // 주소 필터링
  const filteredNotices =
    selectedAddresses.length > 0
      ? allNotices.filter((notice) =>
          selectedAddresses.includes(notice.shop.address1)
        )
      : allNotices;
  return (
    <>
      {!keyword && <RecommendedJobsSection initialData={recommendedNotices} />}
      <AllJobsSection initialData={filteredNotices} keyword={keyword} />
    </>
  );
}
