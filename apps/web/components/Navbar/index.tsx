import React from "react";
import { useRouter } from "next/navigation";
import { Users } from "lucide-react";
import { authStore } from "@/store/AuthStore";
import { logoutUser } from "@/services/AuthService";
import UserDropdown from "../DropdownMenu/UserDropdownMenu";
import { defineHomeGreeting } from "@/lib/utils";

export default function Navbar() {
  const { user } = authStore((state) => state);
  const router = useRouter();
  const homeGreeting = defineHomeGreeting();
  const handleLogoutUser = () => {
    logoutUser();
    router.push("/");
  };

  return (
    <header className="flex flex-row justify-between items-center px-8 py-2">
      <div className="flex flex-row gap-4">
        <Users className="sm:flex hidden" />
        <p className="text-sm font-extrabold">User Management</p>
      </div>
      <div>
        <p className="font-semibold sm:flex hidden">
          {homeGreeting}, {user.username} 👋🏼
        </p>
      </div>
      <UserDropdown user={user} onLogout={handleLogoutUser} />
    </header>
  );
}
