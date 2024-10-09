"use client";
import { authStore } from "@/store/AuthStore";
import Navbar from "~/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const {user} = authStore((state) => state)
  return (
      <div>
      {user.access_token !== undefined && <Navbar />}
      <div className="flex">
        <div className="flex-[4] p-5">{children}</div>
      </div>
      </div>
  );
}
