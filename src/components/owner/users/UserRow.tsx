import { User } from "@/types/User";
import UserActions from "./UserActions";
import { OwnerActions } from "@/enums/OwnerActions";

type UserRowProps = {
  user: User;
  fields: { key: keyof User; placeholder: string }[];
  onAction: (id: number, action: OwnerActions) => void;
};

export default function UserRow({ user, fields, onAction }: UserRowProps) {
  return (
    <tr className='bg-theme-inputbg border-b border-brand-300'>
      {fields.map(({ key }) => (
        <td key={key} className='px-4 py-3 text-primary-900'>
          {typeof user[key] === "boolean" ? user[key] ? "Yes" : "No" : user[key]}
        </td>
      ))}
      <td className='px-4 py-3 gap-2 flex justify-center'>
        <UserActions
          id={user.id}
          onAction={onAction}
          approved={user.approved}
        />
      </td>
    </tr>
  );
}
