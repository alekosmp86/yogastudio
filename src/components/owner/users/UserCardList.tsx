import { User } from "@/types/User";
import UserCard from "./UserCard";
import { OwnerActions } from "@/enums/OwnerActions";

type UserCardListProps = {
  users: User[];
  loading: boolean;
  onAction: (id: number, action: OwnerActions) => void;
};

export default function UserCardList({ users, loading, onAction }: UserCardListProps) {
  return (
    <div className='md:hidden flex flex-col gap-4 shadow-sm'>
      {users.length === 0 ? (
        <h1 className='text-left bg-white py-2'>{loading ? "Loading..." : "No users found"}</h1>
      ) : (
        users.map((user) => (
          <UserCard key={user.id} user={user} onAction={onAction} />
        ))
      )}
    </div>
  );
}
