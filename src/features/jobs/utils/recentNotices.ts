import { Notice } from "@/src/features/jobs/type";

const STORAGE_KEY = "recent_notices";
const MAX_ITEMS = 6;

export const recentNoticesStorage = {
  get: (): Notice[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  add: (notice: Notice) => {
    if (typeof window === "undefined") return;

    const current = recentNoticesStorage.get();
    const filtered = current.filter((item) => item.id !== notice.id);
    const updated = [notice, ...filtered].slice(0, MAX_ITEMS);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  clear: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
  },
};
