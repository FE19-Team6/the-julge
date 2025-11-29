import { getToken } from "@/src/lib/utils/getCookies";
import { redirect } from "next/navigation";
import JobCreateClient from "./jobCreateClient";

type SearchParams = { shopId?: string } | Promise<{ shopId?: string }>;

interface PageProps {
  searchParams: SearchParams;
}

export default async function Page({ searchParams }: PageProps) {
  const token = await getToken();
  if (!token) return redirect("/login");

  const resolved = await searchParams;

  const shopId = resolved.shopId;

  if (!shopId) {
    throw new Error("shopId가 필요합니다.");
  }

  return <JobCreateClient shopId={shopId} />;
}
