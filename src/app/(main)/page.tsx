import { directApi } from "@/src/lib/api/axios/axios";

import { RecommendedJobsSection } from "@/src/features/jobs/components/jobList/RecommendedJobsSection";
import { AllJobsSection } from "./../../features/jobs/components/jobList/AllJobsSection";

export default async function MainPage() {
  return (
    <>
      <RecommendedJobsSection />
      <AllJobsSection />
    </>
  );
}
