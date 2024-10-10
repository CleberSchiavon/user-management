import { UserLoginReturn } from "@repo/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthStore {
  user: UserLoginReturn;
  setUser: (user: UserLoginReturn) => void;
  updateUser: (user: UserLoginReturn) => void;
}

export const authStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: {
        access_token: undefined,
        email: undefined,
        id: undefined,
        username: undefined,
        phoneNumber: undefined,
      },
      setUser: (user: UserLoginReturn) => set({ user }),
      updateUser: (newUser: unknown) =>
        set((state) => ({
          user: { ...state.user, newUser } as UserLoginReturn,
        })),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
