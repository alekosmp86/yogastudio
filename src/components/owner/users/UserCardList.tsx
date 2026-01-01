import { User } from "@/types/User";
import UserCard from "./UserCard";
import { OwnerActions } from "@/enums/OwnerActions";

type UserCardListProps = {
  users: User[];
  onAction: (id: number, action: OwnerActions) => void;
};

export default function UserCardList({ users, onAction }: UserCardListProps) {
  return (
    <div className="md:hidden flex flex-col gap-3 overflow-hidden overflow-y-auto max-h-[calc(100vh-350px)]">
      {users.map((user) => (
        <UserCard key={user.id} user={user} onAction={onAction} />
      ))}
    </div>
  );
}
