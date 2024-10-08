"use client";
import UserStoreProvider from "store/UserStore";

export default function Layout({ children }: { children: React.ReactNode }) {
  const users = [];

  return (
    <UserStoreProvider loading={false} users={users}>
      <div className="flex">
        <div className="flex-[4] p-5">{children}</div>
      </div>
    </UserStoreProvider>
  );
}
