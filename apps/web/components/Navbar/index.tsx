import React from "react";
import { useRouter } from "next/navigation";
import {Users} from 'lucide-react'
import { useAuthStore } from "@/store/AuthStore";
import { logoutUser } from "@/services/AuthService";
import UserDropdown from "../DropdownMenu/UserDropdownMenu";
import { defineHomeGreeting } from "@/lib/utils";
import { useUserStore } from "@/store/UserStore";

export default function Navbar() {
const {users} = useUserStore()((state) => state)
  const { user } = useAuthStore()((state) => state);
  const router = useRouter()
  const homeGreeting = defineHomeGreeting()
  const handleLogoutUser = () => {
    logoutUser();
    router.push('/')
  }

  return (
    <header className="flex flex-row justify-between items-center px-8 py-2">
      <div className="flex flex-row gap-4">
        <Users />
        <p className="text-sm">User Management</p>
      </div>
      <div>
        <p>{homeGreeting}, existem {users.length} usuários cadastrados</p>
      </div>
        <UserDropdown user={user} onLogout={handleLogoutUser} />
    </header>
  );
}
