import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type SessionStoreType = {
  token: string;
};

type SessionStoreActions = {
  setToken: (token: string) => void;
  setClearToken: () => void;
};

export const useSessionStore = create(
  devtools(
    persist<SessionStoreType & SessionStoreActions>(
      (set) => ({
        token: "",
        setToken: (token: string) => set({ token }),
        setClearToken: () => set({ token: "" }),
      }),
      {
        name: "Session-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
