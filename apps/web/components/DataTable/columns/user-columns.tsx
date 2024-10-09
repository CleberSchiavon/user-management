import { User } from "@repo/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "~/components/Button";
import TimeAgo from "~/components/TimeAgo";

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
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <div className="flex flex-row">
          <Button variant="ghost" size="icon">
            <Edit size={16} color="black" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 size={16} color="black" />
          </Button>
        </div>
      );
    },
  },
];
