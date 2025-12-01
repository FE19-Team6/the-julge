import CardList from "@/src/components/common/Card/CardList";
import { Notice } from "../../type";
import { noticeToCard } from "../../utils/noticeToCard";

interface RecommendedJobsSectionProps {
  initialData: Notice[];
}

export const RecommendedJobsSection = ({
  initialData,
}: RecommendedJobsSectionProps) => {
  const cardData = initialData.map(noticeToCard);
  return (
    <section className="w-full py-[60px] flex justify-center bg-red-10">
      <div className="w-full max-w-[964px]">
        <h2 className="mb-6 text-h2">맞춤 공고</h2>
        <CardList items={cardData}></CardList>
      </div>
    </section>
  );
};
