import { User } from "@/types/User";
import UserActions from "./UserActions";
import { OwnerActions } from "@/enums/OwnerActions";

type UserCardProps = {
  user: User;
  onAction: (id: number, action: OwnerActions) => void;
};

export default function UserCard({ user, onAction }: UserCardProps) {
  return (
    <div className="border border-brand-300 rounded-xl p-4 shadow-sm">
      <div className="text-base text-theme-inputbg font-semibold">{user.name}</div>
      <div className="text-sm font-medium text-textcolor-primary">{user.email}</div>
      <div className="text-sm font-medium text-textcolor-primary mb-3">{user.phone}</div>

      <div className="flex justify-between mt-2">
        <UserActions
          id={user.id}
          approved={user.approved}
          onAction={onAction}
          mobile
        />
      </div>
    </div>
  );
}
