import React, { useState } from "react";
import { Dialog } from "../Dialog";
import { Button } from "../Button";
import { userStore } from "@/store/UserStore";
import { deleteUser } from "@/services/UsersService";

interface IDeleteUserModal {
  open: boolean;
  onCloseDialog: () => void;
}

export default function DeleteUserModal({
  open,
  onCloseDialog,
}: Readonly<IDeleteUserModal>) {
  const [loading, setLoading] = useState(false);
  const { fetchUsers, currentEditedUser } = userStore();

  const fetchTableData = async ({ page, itemsPerPage }) => {
    await fetchUsers(page, itemsPerPage);
  };

  const handleDeleteUser = async () => {
    setLoading(true);
    try {
      await deleteUser({ id: currentEditedUser.id });
      await fetchTableData({ page: 1, itemsPerPage: 10 });
    } finally {
      setLoading(false);
      onCloseDialog();
    }
  };
  return (
    <Dialog
      title="Excluir usuário"
      open={open}
      showCloseButton={false}
      onCloseDialog={onCloseDialog}
      modalFooter={
        <div className="flex flex-row gap-4">
          <Button
            disabled={loading}
            onClick={() => onCloseDialog()}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            disabled={loading}
            onClick={() => handleDeleteUser()}
          >
            Deletar
          </Button>
        </div>
      }
    >
      <div>
        <p className="text-gray-700">
          Tem certeza que deseja excluir esse usuário? Essa ação não poderá ser
          desfeita
        </p>
      </div>
    </Dialog>
  );
}
