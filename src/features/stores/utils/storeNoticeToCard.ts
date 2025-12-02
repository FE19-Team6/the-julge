import { StoreNotice } from "@/src/app/(main)/mystore/[id]/action";
import { CardProps } from "@/src/components/common/Card/Card";

type StoreInfo = {
  id: string;
  name: string;
  address1: string;
  imageUrl: string;
  originalHourlyPay: number;
};

export function storeNoticeToCard(
  notice: StoreNotice,
  store: StoreInfo
): CardProps {
  return {
    id: notice.id,
    name: store.name,
    address1: store.address1,
    imageUrl: store.imageUrl,
    startsAt: notice.startsAt,
    workhour: notice.workhour,
    hourlyPay: notice.hourlyPay,
    originalHourlyPay: store.originalHourlyPay,
    href: `/jobs/${notice.id}?shopId=${store.id}`,
  };
}
