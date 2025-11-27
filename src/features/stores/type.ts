import { StoreCreateValues } from "./hooks/useCreateStoreForm";

export type StoreFieldChange = (
  key: keyof StoreCreateValues,
  value: string | number
) => void;
