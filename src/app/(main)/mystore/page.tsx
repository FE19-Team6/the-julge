import NoData from "@/src/components/common/NoData/NoData";
import LinkButton from "@/src/components/common/Button/LinkButton";

export default function StoreInfoDetailEmptyPage() {
  const hasStore = false;

  return (
    <div className="w-full flex flex-col items-center">
      <section className="w-full flex justify-center">
        <div className="w-full max-w-5xl px-4 flex flex-col mt-10">
          <h1 className="text-xl font-bold mb-6">내 가게</h1>

          {!hasStore ? (
            <NoData
              title="아직 등록된 가게가 없어요."
              description="가게 정보를 등록하고 공고도 올려보세요!"
              action={
                <LinkButton href="/mystore/create" variant="primary" size="lg">
                  가게 등록하기
                </LinkButton>
              }
            />
          ) : (
            <div>가게 상세 내용</div>
          )}
        </div>
      </section>
    </div>
  );
}
