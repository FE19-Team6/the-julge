import NoData from "@/components/common/NoData/NoData";
import LinkButton from "@/components/common/Button/LinkButton";

export default function MyStoreStartPage() {
  const hasStore = false;
  return (
    <div className="w-full flex flex-col items-center">
      <section className="w-full flex justify-center">
        <div className="w-full max-w-5xl px-4 flex flex-col mt-10">
          <h1 className="text-xl font-bold mb-6">내 가게</h1>

          {!hasStore ? (
            <NoData
              title="내 가게를 소개하고 공고도 등록해 보세요"
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

      <section className="w-full h-[459px] bg-white flex justify-center">
        {/* 나중에 공고 리스트 들어가는 자리 */}
      </section>
    </div>
  );
}
