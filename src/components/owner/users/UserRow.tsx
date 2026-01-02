import { User } from "@/types/User";
import UserActions from "./UserActions";
import { OwnerActions } from "@/enums/OwnerActions";
import { cn } from "@/lib/utils/utils";
import { TableField } from "@/types/TableField";

type UserRowProps = {
  user: User;
  fields: TableField<User>[];
  onAction: (id: number, action: OwnerActions) => void;
};

export default function UserRow({ user, fields, onAction }: UserRowProps) {
  return (
    <tr className="bg-white/80 border-b border-custom-100">
      {fields.map(({ key, style }) => (
        <td key={String(key)} className={cn("px-4 py-3 text-sm text-custom-400 align-middle", style)}>
          {typeof user[key] === "boolean"
            ? user[key]
              ? "Yes"
              : "No"
            : user[key]}
        </td>
      ))}
      <td className="px-4 py-3 gap-2 flex justify-center">
        <UserActions
          id={user.id}
          onAction={onAction}
          approved={user.approved}
        />
      </td>
    </tr>
  );
}
