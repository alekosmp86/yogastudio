import { ApiType } from "@/enums/ApiTypes";
import { RequestStatus } from "@/enums/RequestStatus";
import { OwnerActions } from "@/enums/OwnerActions";
import { http } from "@/lib/http";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { User } from "@/types/User";
import { useEffect, useState } from "react";
import UserTable from "./UserTable";
import UserCardList from "./UserCardList";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const { message, data } = await http.get<ApiResponse<User[]>>("/owner/users", ApiType.FRONTEND);
      if (message !== RequestStatus.SUCCESS) return;

      setUsers(data || []);
    };

    getAllUsers();
  }, []);

  const handleAction = async (id: number, action: OwnerActions) => {
    const { message, data } = await http.put<ApiResponse<User>>(`/owner/users/${id}/${action}`, ApiType.FRONTEND);
    if (message !== RequestStatus.SUCCESS) return;

    setUsers((prevUsers) => prevUsers.map((user) => user.id === id ? data! : user));
  };

  return (
    <div className="w-full ">
      <h2 className="text-xl font-semibold text-theme-inputbg mt-4 mb-4">Users</h2>

      {/* Desktop */}
      <UserTable
        users={users}
        onAction={handleAction}
      />

      {/* Mobile */}
      <UserCardList
        users={users}
        onAction={handleAction}
      />
    </div>
  );
}

