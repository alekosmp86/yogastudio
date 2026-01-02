import { User } from "@/types/User";
import UserCard from "./UserCard";
import { UserActions } from "@/enums/UserActions";

type UserCardListProps = {
  users: User[];
  onAction: (id: number, action: UserActions) => void;
};

export default function UserCardList({ users, onAction }: UserCardListProps) {
  return (
    <div className="md:hidden flex flex-col overflow-hidden overflow-y-auto max-h-[calc(100vh-325px)]">
      {users.map((user) => (
        <UserCard key={user.id} user={user} onAction={onAction} />
      ))}
    </div>
  );
}
