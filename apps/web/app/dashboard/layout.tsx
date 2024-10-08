"use client";
import { useAuthStore } from "@/store/AuthStore";
import UserStoreProvider from "store/UserStore";
import Navbar from "~/components/Navbar";
import {isEmpty} from 'lodash'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore()((state) => state);

  const users = [];

  return (
    <UserStoreProvider loading={false} users={users}>
      {!isEmpty(user) && <Navbar />}
      <div className="flex">
        <div className="flex-[4] p-5">{children}</div>
      </div>
    </UserStoreProvider>
  );
}
