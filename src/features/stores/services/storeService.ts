import { api } from "@/src/lib/api/axios/axios";

export interface CreateStorePayload {
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

export const storeService = {
  async create(payload: CreateStorePayload) {
    const res = await api.post("/shops", payload);
    return res.data;
  },
};
