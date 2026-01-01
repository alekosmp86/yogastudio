import { User } from "@/types/User";
import UserActions from "./UserActions";
import { OwnerActions } from "@/enums/OwnerActions";

type UserCardProps = {
  user: User;
  onAction: (id: number, action: OwnerActions) => void;
};

export default function UserCard({ user, onAction }: UserCardProps) {
  return (
    <div className="bg-white m-2 border border-custom-100 rounded-xl p-4 shadow-sm">
      {/* USER INFO */}
      <div className="flex flex-col gap-0.5">
        <span className="text-base font-semibold text-custom-500">
          {user.name}
        </span>

        <span className="text-sm text-custom-400">
          {user.email}
        </span>

        <span className="text-sm text-custom-300">
          {user.phone}
        </span>
      </div>

      {/* ACTIONS */}
      <div className="mt-4 flex justify-end">
        <UserActions
          id={user.id}
          approved={user.approved}
          onAction={onAction}
          mobile
        />
      </div>
    </div>
  )
}
