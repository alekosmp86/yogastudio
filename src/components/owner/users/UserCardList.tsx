import { User } from "@/types/User";
import UserCard from "./UserCard";
import { OwnerActions } from "@/enums/OwnerActions";

type UserCardListProps = {
  users: User[];
  onAction: (id: number, action: OwnerActions) => void;
};

export default function UserCardList({ users, onAction }: UserCardListProps) {
  return (
    <div className="md:hidden flex flex-col gap-4 shadow-sm">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onAction={onAction}
        />
      ))}
    </div>
  );
}
