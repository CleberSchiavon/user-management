import React from "react";
import { useRouter } from "next/navigation";
import { Users } from "lucide-react";
import { authStore } from "@/store/AuthStore";
import { logoutUser } from "@/services/AuthService";
import UserDropdown from "../DropdownMenu/UserDropdownMenu";
import { defineHomeGreeting } from "@/lib/utils";
import { isUndefined } from "lodash";
import { userStore } from "@/store/UserStore";

export default function Navbar() {
  const { user } = authStore((state) => state);
  const { users } = userStore((state) => state);
  const router = useRouter();
  const homeGreeting = defineHomeGreeting();
  const { itemCount } = users.meta;
  const handleLogoutUser = () => {
    logoutUser();
    router.push("/");
  };

  return (
    <header className="flex flex-row justify-between items-center px-8 py-2">
      <div className="flex flex-row gap-4">
        <Users />
        <p className="text-sm font-extrabold">User Management</p>
      </div>
      <div>
        <p className="font-semibold">
          {homeGreeting}
          {!isUndefined(users) && itemCount < 1
            ? `, existe ${itemCount} usuário cadastrado`
            : `, existem ${itemCount} usuários cadastrados`}
        </p>
      </div>
      <UserDropdown user={user} onLogout={handleLogoutUser} />
    </header>
  );
}
