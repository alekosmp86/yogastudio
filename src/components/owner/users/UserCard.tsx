import { User } from "@/types/User";
import UserActions from "./UserActions";
import { OwnerActions } from "@/enums/OwnerActions";

type UserCardProps = {
  user: User;
  onAction: (id: number, action: OwnerActions) => void;
};

export default function UserCard({ user, onAction }: UserCardProps) {
  return (
    <div className="bg-white border border-white rounded-sm p-4 shadow-sm">
      <div className="text-base text-primary-900 font-semibold">{user.name}</div>
      <div className="text-sm font-medium text-primary-900">{user.email}</div>
      <div className="text-sm font-medium text-primary-900 mb-3">{user.phone}</div>

      <div className="flex justify-end mt-2">
        <UserActions
          id={user.id}
          approved={user.approved}
          onAction={onAction}
        />
      </div>
    </div>
  );
}
