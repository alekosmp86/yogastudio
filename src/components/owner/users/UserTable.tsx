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
    { key: "approved", placeholder: "Approved" },
  ];

  return (
    <>
      {users.length > 0 ? (
        <div className='hidden md:block overflow-hidden rounded-sm border border-primary-900 shadow-sm'>
          <table className='w-full text-center text-brand-200'>
            <TableHeader fields={fields} />

            <tbody className='divide-y'>
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
      ) : (
        <h1 className='text-left bg-white py-2'>No users found</h1>
      )}
    </>
  );
}
