// NoticeApiResponse 평탄화
export interface Notice {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  shop: {
    id: string;
    name: string;
    category: string;
    address1: string;
    address2: string;
    imageUrl: string;
    originalHourlyPay: number;
  };
}

// API 응답 타입 원본
export interface NoticeApiResponse {
  items: {
    item: {
      id: string;
      hourlyPay: number;
      startsAt: string;
      workhour: number;
      description: string;
      closed: boolean;
      shop: {
        href: string;
        item: {
          id: string;
          name: string;
          category: string;
          address1: string;
          address2: string;
          imageUrl: string;
          originalHourlyPay: number;
        };
      };
    };
  }[];
}
