import { getUserType } from "@/src/lib/utils/getCookies";
import Header from "@/src/components/common/Header/Header";
import { Footer } from "./../../components/common/Footer/Footer";

//Layout은 Server Component이고 Server Component는 async 함수로 만들 수 있습니다.
export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userType = await getUserType();

  return (
    <div className="min-h-screen flex flex-col">
      <Header userType={userType} />
      <main className="flex-1 w-full max-w-[1200px] mx-auto">{children}</main>
      {/* 푸터 완성되면 아래 지우고 컴포넌트 교체 */}
      <Footer />
    </div>
  );
}
