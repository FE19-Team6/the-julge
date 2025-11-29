import { RecommendedJobsSection } from "@/src/features/jobs/components/jobList/RecommendedJobsSection";
import { AllJobsSection } from "./../../features/jobs/components/jobList/AllJobsSection";
import { getUserAddress } from "@/src/lib/utils/getCookies";
import { noticeService } from "@/src/features/jobs/services/getNotices";

export default async function MainPage() {
  const address = (await getUserAddress()) ?? "";

  // 맞춤 공고 (주소 기반)
  const recommendedNotices = await noticeService.getNotice({ address });

  // 전체 공고 (기본값)
  const allNotices = await noticeService.getNotice({ limit: 10, offset: 0 });
  return (
    <>
      <RecommendedJobsSection initialData={recommendedNotices} />
      <AllJobsSection initialData={allNotices} />
    </>
  );
}
