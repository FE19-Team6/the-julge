import type { NoticeWrapper, FlattenedStoreDetail } from "./types";
import { formatDate } from "@/src/lib/utils/formatDate";

export function mapNoticeListToCardProps(
  notices: NoticeWrapper[],
  store: FlattenedStoreDetail
) {
  return notices.map(({ item: n }) => {
    return {
      id: n.id,
      name: store.name,
      address1: store.address1,
      imageUrl: store.imageUrl,
      startsAt: formatDate(n.startsAt),
      workhour: n.workhour,
      hourlyPay: n.hourlyPay,
      originalHourlyPay: store.originalHourlyPay,
      status: n.status,
      href: `/jobs/${n.id}?shopId=${store.id}`,
    };
  });
}
