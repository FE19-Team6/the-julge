import CardList from "@/src/components/common/Card/CardList";
//import Pagination from "@/src/components/Pagination/Pagination";
import { FilterGroup } from "./FilterGroup";
import { Notice } from "../../type";
import { noticeToCard } from "../../utils/noticeToCard";

interface AllJobsSectionProps {
  initialData: Notice[];
}

export const AllJobsSection = ({ initialData }: AllJobsSectionProps) => {
  const cardData = initialData.map(noticeToCard);

  return (
    <section className="w-full py-[60px] flex justify-center">
      <div className="w-full max-w-[964px]">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-h2">전체 공고</h2>
          <FilterGroup />
        </header>
        <CardList items={cardData}></CardList>
        {/* <Pagination /> */}
      </div>
    </section>
  );
};
