import NoData from "@/src/components/common/NoData/NoData";
import LinkButton from "@/src/components/common/Button/LinkButton";
import { getToken, getUserId } from "@/src/lib/utils/getCookies";
import { redirect } from "next/navigation";

export default async function StoreInfoPage() {
  const token = await getToken();
  if (!token) redirect("/login");

  const userId = await getUserId();
  if (!userId) redirect("/login");

  // 사용자 정보 조회 (shop 포함)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("사용자 정보 조회 실패");

  const data = await res.json();
  const shopId = data.item?.shop?.item?.id;

  // 가게 있으면 → 상세 페이지로
  if (shopId) {
    redirect(`/mystore/${shopId}`);
  }

  // 가게 없으면 → 등록 안내
  return (
    <div className="w-full flex flex-col items-center">
      <section className="w-full flex justify-center">
        <div className="w-full max-w-5xl px-4 flex flex-col mt-10">
          <h1 className="text-xl font-bold mb-6">내 가게</h1>
          <NoData
            title="아직 등록된 가게가 없어요."
            description="가게 정보를 등록하고 공고도 올려보세요!"
            action={
              <LinkButton href="/mystore/create" variant="primary" size="lg">
                가게 등록하기
              </LinkButton>
            }
          />
        </div>
      </section>
    </div>
  );
}
