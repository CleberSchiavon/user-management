import { User } from "@repo/types";
import { ColumnDef } from "@tanstack/react-table";
import TimeAgo from "~/components/TimeAgo";
import UserTableActions from "../actions/UserTableActions";

export const UsersTableColumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    accessorKey: "phoneNumber",
    header: "Número de telefone",
  },
  {
    accessorKey: "createdAt",
    header: "Data de criação",
    cell: ({ getValue }) => <TimeAgo date={getValue()} />,
  },
  {
    accessorKey: "updatedAt",
    header: "Data de atualização",
    cell: ({ getValue }) => <TimeAgo date={getValue()} />,
  },
  {
    header: "Ações",
    id: "actions",
    cell: ({ row }) => <UserTableActions user={row.original} />,
  },
];
