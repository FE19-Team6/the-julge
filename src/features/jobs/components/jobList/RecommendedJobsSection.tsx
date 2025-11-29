import CardList from "@/src/components/common/Card/CardList";

export const RecommendedJobsSection = () => {
  return (
    <section className="w-full py-[60px] flex justify-center bg-red-10">
      <div className="w-full max-w-[964px]">
        <h2 className="mb-6 text-h2">맞춤 공고</h2>

        <ul className="grid grid-cols-3 gap-4">
          {/* <CardList items={items}></CardList> */}
        </ul>
      </div>
    </section>
  );
};
