import { User } from "@/types/User";
import UserRow from "./UserRow";
import { OwnerActions } from "@/enums/OwnerActions";
import { TableField } from "@/types/TableField";
import TableHeader from "../../shared/TableHeader";

type UserTableProps = {
  users: User[];
  onAction: (id: number, action: OwnerActions) => void;
};

export default function UserTable({ users, onAction }: UserTableProps) {
  const fields: TableField<User>[] = [
    { key: "name", placeholder: "Name" },
    { key: "email", placeholder: "Email" },
    { key: "phone", placeholder: "Phone" },
    { key: "approved", placeholder: "Approved", style: "text-center" },
  ];

  return (
    <>
      <div className="overflow-hidden rounded-md shadow-sm ring-1 ring-custom-200 backdrop-blur">
        <table className="w-full text-custom-500">
          <TableHeader fields={fields} />

          <tbody className="divide-y divide-primary-900">
            {users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                fields={fields}
                onAction={onAction}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
