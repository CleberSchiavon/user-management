import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "../Dialog";
import { Button } from "../Button";
import { Input } from "../Input";
import EditUserSchema, { EditUser } from "../Forms/schemas/EditUser";
import { updateUser } from "@/services/UsersService";
import { userStore } from "@/store/UserStore";

interface IEditUserModal {
  open: boolean;
  onCloseDialog: () => void;
}

export default function EditUserModal({
  open,
  onCloseDialog,
}: Readonly<IEditUserModal>) {
  const { fetchUsers, currentEditedUser, setCurrentEditedUser } = userStore();

  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EditUser>({
    mode: "onBlur",
    resolver: zodResolver(EditUserSchema),
  });

  useEffect(() => {
    if (currentEditedUser) {
      setValue("username", currentEditedUser.username);
      setValue("email", currentEditedUser.email);
      setValue("phoneNumber", currentEditedUser.phoneNumber);
    }
  }, [currentEditedUser]);

  const fetchTableData = async ({ page, itemsPerPage }) => {
    await fetchUsers(page, itemsPerPage);
  };

  const closeDialog = () => {
    onCloseDialog();
    reset();
    setCurrentEditedUser(null);
  };
  const onSubmit = async (data: EditUser) => {
    setLoading(true);
    try {
      await updateUser({ id: currentEditedUser.id, user: data });
      await fetchTableData({ page: 1, itemsPerPage: 10 });
    } finally {
      setLoading(false);
      closeDialog();
    }
  };
  return (
    <Dialog
      title="Editar usuários"
      open={open}
      showCloseButton={false}
      onCloseDialog={onCloseDialog}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <Input
            disabled={loading}
            label="Nome de Usuário"
            placeholder="Username"
            defaultValue={currentEditedUser?.username}
            errorMessage={errors.username?.message}
            {...register("username")}
          />
          <Input
            disabled={loading}
            label="E-mail"
            placeholder="E-mail"
            defaultValue={currentEditedUser?.email}
            errorMessage={errors.email?.message}
            {...register("email")}
          />
          <Input
            disabled={loading}
            label="Telefone"
            type="tel"
            placeholder="Telefone"
            required={false}
            defaultValue={currentEditedUser?.phoneNumber}
            errorMessage={errors.phoneNumber?.message}
            {...register("phoneNumber")}
          />
        </div>
        <div className="flex justify-end flex-row gap-4">
          <Button
            variant="destructive"
            type="button"
            onClick={() => closeDialog()}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            Editar
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
