import CardList from "@/src/components/common/Card/CardList";
import { FilterGroup } from "./FilterGroup";
import { Notice } from "../../type";
import { noticeToCard } from "../../utils/noticeToCard";
import PaginationWrapper from "./PaginationWrapper";

interface AllJobsSectionProps {
  initialData: Notice[];
  keyword?: string;
  currentPage: number;
  totalPages: number;
}

export const AllJobsSection = ({
  initialData,
  keyword,
  currentPage,
  totalPages,
}: AllJobsSectionProps) => {
  const cardData = initialData.map(noticeToCard);

  return (
    <section className="w-full py-[60px] flex justify-center">
      <div className="w-full max-w-[964px]">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-h2">
            {keyword ? (
              <>
                <span className="text-red-40">{keyword}</span>에 대한 공고 목록
              </>
            ) : (
              "전체 공고"
            )}
          </h2>
          <FilterGroup />
        </header>
        <CardList items={cardData}></CardList>
        <PaginationWrapper current={currentPage} total={totalPages} />
      </div>
    </section>
  );
};
