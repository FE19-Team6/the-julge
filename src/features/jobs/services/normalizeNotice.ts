// import { NoticeApiResponse, Notice } from "../types/notice";
import { Notice, NoticeApiResponse } from "./../type";

export function normalizeNoticeApiResponse(
  response: NoticeApiResponse
): Notice[] {
  return response.items.map(({ item }) => {
    const shop = item.shop.item;

    return {
      id: item.id,
      hourlyPay: item.hourlyPay,
      startsAt: item.startsAt,
      workhour: item.workhour,
      description: item.description,
      closed: item.closed,
      shop: {
        id: shop.id,
        name: shop.name,
        category: shop.category,
        address1: shop.address1,
        address2: shop.address2,
        imageUrl: shop.imageUrl,
        originalHourlyPay: shop.originalHourlyPay,
      },
    };
  });
}
