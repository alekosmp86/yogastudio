import { User } from "@/types/User";
import UserActions from "./UserActions";

type UserRowProps = {
  user: User;
  fields: { key: keyof User; placeholder: string }[];
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
};

export default function UserRow({ user, fields, onApprove, onReject }: UserRowProps) {
  return (
    <tr className='bg-surface-divider border-b border-brand-300'>
      {fields.map(({ key }) => (
        <td key={key} className='px-4 py-3 text-textcolor-primary'>
          {user[key as keyof User]}
        </td>
      ))}
      <td className='px-4 py-3 gap-2 flex justify-center'>
        <UserActions id={user.id} onApprove={onApprove} onReject={onReject} />
      </td>
    </tr>
  );
}
