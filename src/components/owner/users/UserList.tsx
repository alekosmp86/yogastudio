import { ApiType } from "@/enums/ApiTypes";
import { RequestStatus } from "@/enums/RequestStatus";
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

  const handleApprove = (id: number) => {
    console.log("Approve", id);
  };

  const handleReject = (id: number) => {
    console.log("Reject", id);
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Pending Users</h2>

      {/* Desktop */}
      <UserTable
        users={users}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      {/* Mobile */}
      <UserCardList
        users={users}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}

