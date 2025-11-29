import { RecommendedJobsSection } from "@/src/features/jobs/components/jobList/RecommendedJobsSection";
import { AllJobsSection } from "./../../features/jobs/components/jobList/AllJobsSection";
import { getUserAddress } from "@/src/lib/utils/getCookies";

import { normalizeNoticeApiResponse } from "@/src/features/jobs/services/normalizeNotice";
import { noticeToCard } from "@/src/features/jobs/utils/noticeToCard";

export default async function MainPage() {
  // ssr에서 쿠키읽기
  const address = (await getUserAddress()) ?? "";

  // 1) API raw fetch
  const raw = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/notices?address=${address}`,
    { cache: "no-store" }
  ).then((res) => res.json());

  // 2) 정규화 (nested → flat Notice[])
  const notices = normalizeNoticeApiResponse(raw);

  // 3) UI 형태(CardProps[])로 변환
  const initialData = notices.map(noticeToCard);
  return (
    <>
      <RecommendedJobsSection
        initialData={initialData}
        initialAddress={address}
      />
      <AllJobsSection />
    </>
  );
}
