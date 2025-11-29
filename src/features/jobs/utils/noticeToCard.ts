import { CardProps } from "@/src/components/common/Card/Card";
import { Notice } from "./../type";

export function noticeToCard(n: Notice): CardProps {
  return {
    id: n.id,
    name: n.shop.name,
    address1: n.shop.address1,
    imageUrl: n.shop.imageUrl,
    startsAt: n.startsAt,
    workhour: n.workhour,
    hourlyPay: n.hourlyPay,
    originalHourlyPay: n.shop.originalHourlyPay,
  };
}
