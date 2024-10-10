import { getUsers } from "@/services/UsersService";
import { PageMetaDto, User, UserFetchResponse } from "@repo/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserStore {
  users: UserFetchResponse | null;
  setUsers: (users: UserFetchResponse) => void;
  updateUser: (newUsers: UserFetchResponse) => void;
  fetchUsers: (page: number, take: number) => Promise<void>;
  currentEditedUser: User | null;
  setCurrentEditedUser: (user: User) => void;
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
      fetchUsers: async (page, take) => {
        const response = await getUsers(page, take);
        set({ users: response });
      },
      currentEditedUser: null,
      setCurrentEditedUser: (user: User) => set({ currentEditedUser: user }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
