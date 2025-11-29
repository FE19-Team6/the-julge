import { directApi } from "@/src/lib/api/axios/axios";
import { NoticeApiResponse } from "../type";
import { CardProps } from "@/src/components/common/Card/Card";

export interface GetNoticesParams {
  address?: string;
  offset?: number;
  limit?: number;
  sort?: string;
  keyword?: string;
  startsAtGte?: string;
  hourlyPayGte?: number;
}

export const getNotices = async (
  params?: GetNoticesParams
): Promise<NoticeApiResponse> => {
  const response = await directApi.get<NoticeApiResponse>("notices", {
    params,
  });

  return response.data;
};
