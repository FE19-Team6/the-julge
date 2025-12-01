import { NoticeApiResponse, Notice, NoticeServiceResponse } from "../type";

export const noticeService = {
  getNotice: async (
    params?: Record<string, string | number>
  ): Promise<NoticeServiceResponse> => {
    const query = params
      ? `?${new URLSearchParams(params as Record<string, string>)}`
      : "";

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/notices${query}`,
      { cache: "no-store" }
    );

    const data: NoticeApiResponse = await res.json();

    const mappedItems = data.items.map((notice) => ({
      id: notice.item.id,
      hourlyPay: notice.item.hourlyPay,
      startsAt: notice.item.startsAt,
      workhour: notice.item.workhour,
      description: notice.item.description,
      closed: notice.item.closed,
      shop: {
        id: notice.item.shop.item.id,
        name: notice.item.shop.item.name,
        category: notice.item.shop.item.category,
        address1: notice.item.shop.item.address1,
        address2: notice.item.shop.item.address2,
        imageUrl: notice.item.shop.item.imageUrl,
        originalHourlyPay: notice.item.shop.item.originalHourlyPay,
      },
    }));

    // 전체 응답 반환
    return {
      items: mappedItems,
      count: data.count,
      limit: data.limit,
      offset: data.offset,
      hasNext: data.hasNext,
    };
  },
};
