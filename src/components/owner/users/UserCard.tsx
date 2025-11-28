import { User } from "@/types/User";
import UserActions from "./UserActions";

type UserCardProps = {
  user: User;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
};

export default function UserCard({ user, onApprove, onReject }: UserCardProps) {
  return (
    <div className="bg-surface-divider border border-brand-300 rounded-xl p-4 shadow-sm">
      <div className="text-base text-textcolor-primary font-semibold">{user.name}</div>
      <div className="text-sm font-medium text-textcolor-primary">{user.email}</div>
      <div className="text-sm font-medium text-textcolor-primary mb-3">{user.phone}</div>

      <div className="flex justify-between mt-2">
        <UserActions
          id={user.id}
          onApprove={onApprove}
          onReject={onReject}
          mobile
        />
      </div>
    </div>
  );
}
