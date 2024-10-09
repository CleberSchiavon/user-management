import { getUsers } from "@/services/UsersService";
import { PageMetaDto, User, UserFetchResponse } from "@repo/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserStore {
  users: UserFetchResponse | null;
  setUsers: (users: UserFetchResponse) => void;
  updateUser: (newUsers: UserFetchResponse) => void;
  fetchUsers: () => Promise<void>;
}

export const userStore = create<UserStore>()(
  persist(
    (set) => ({
      users: {
        data: [],
        meta: {} as PageMetaDto,
      },
      setUsers: (users: UserFetchResponse) => set({ users }),
      updateUser: (newUsers: UserFetchResponse) =>
        set((state) => ({
          users: { ...state.users, newUsers } as UserFetchResponse,
        })),
      fetchUsers: async () => {
        const response = await getUsers();
        set({ users: response });
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
