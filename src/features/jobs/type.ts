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
  offset: number;
  limit: number;
  address: string[];
  count: number;
  hasNext: boolean;
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

// 서비스 반환 타입
export interface NoticeServiceResponse {
  items: Notice[];
  count: number;
  limit: number;
  offset: number;
  hasNext: boolean;
}
