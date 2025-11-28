import { User } from "@/types/User";
import UserRow from "./UserRow";

type UserTableProps = {
  users: User[];
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
};

export default function UserTable({ users, onApprove, onReject }: UserTableProps) {
  const fields: { key: keyof User; placeholder: string }[] = [
    { key: "name", placeholder: "Name" },
    { key: "email", placeholder: "Email" },
    { key: "phone", placeholder: "Phone" },
  ];

  return (
    <div className='hidden md:block overflow-hidden rounded-lg border border-gray-200 shadow-sm'>
      <table className='w-full text-center text-brand-200'>
        <thead className='bg-surface-section rounded-lg text-brand-400 sticky top-0 z-10'>
          <tr>
            {fields.map(({ key, placeholder }) => (
              <th key={key} className='px-4 py-3'>{placeholder}</th>
            ))}
            <th className='px-4 py-3 text-center'>Actions</th>
          </tr>
        </thead>

        <tbody className='divide-y'>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              fields={fields}
              onApprove={onApprove}
              onReject={onReject}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
