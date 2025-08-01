import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type SiteStoreType = {
  logoType: string;
};

type SiteStoreActions = {
  setLogoType: (logoType: string) => void;
};

export const useSiteStore = create(
  devtools(
    persist<SiteStoreType & SiteStoreActions>(
      (set) => ({
        logoType: "",
        setLogoType: (logoType: string) => set({ logoType }),
      }),
      {
        name: "site-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
