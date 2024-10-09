"use client";
import { authStore } from "@/store/AuthStore";
import Navbar from "~/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const {user} = authStore((state) => state)
  return (
      <>
      {user.access_token !== undefined && <Navbar />}
      {children}
      </>
  );
}
