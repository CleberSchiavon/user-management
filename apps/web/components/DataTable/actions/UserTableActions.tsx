import { useLayoutContext } from "@/context/LayoutContext";
import { userStore } from "@/store/UserStore";
import { User } from "@repo/types";
import { Edit, Trash2 } from "lucide-react";
import React from "react";
import { Button } from "~/components/Button";

interface IUserTableActions {
  user: User;
}

export default function UserTableActions({ user }: IUserTableActions) {
  const { setEditUserModal, setDeleteUserModal } = useLayoutContext();
  const { setCurrentEditedUser } = userStore();
  return (
    <div className="flex flex-row">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          setEditUserModal(true);
          setCurrentEditedUser(user);
        }}
      >
        <Edit size={16} color="black" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          setDeleteUserModal(true);
          setCurrentEditedUser(user);
        }}
      >
        <Trash2 size={16} color="black" />
      </Button>
    </div>
  );
}
