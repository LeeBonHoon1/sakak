import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { CheckupData } from "@/features/checkup/types";

type CheckupState = {
  checkupData: CheckupData | null;
  hasCheckupData: boolean;
  setCheckupData: (data: CheckupData) => void;
  clearCheckupData: () => void;
};

export const useCheckupStore = create<CheckupState>()(
  persist(
    (set) => ({
      checkupData: null,
      hasCheckupData: false,
      setCheckupData: (data) =>
        set({ checkupData: data, hasCheckupData: true }),
      clearCheckupData: () => set({ checkupData: null, hasCheckupData: false }),
    }),
    {
      name: "checkup-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
