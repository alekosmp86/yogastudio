import { User } from "@/types/User";
import UserCard from "./UserCard";

type UserCardListProps = {
  users: User[];
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
};

export default function UserCardList({ users, onApprove, onReject }: UserCardListProps) {
  return (
    <div className="md:hidden flex flex-col gap-4 shadow-sm">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onApprove={onApprove}
          onReject={onReject}
        />
      ))}
    </div>
  );
}
