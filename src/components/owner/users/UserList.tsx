import { ApiType } from "@/enums/ApiTypes";
import { RequestStatus } from "@/enums/RequestStatus";
import { OwnerActions } from "@/enums/OwnerActions";
import { http } from "@/lib/http";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { User } from "@/types/User";
import { useEffect, useMemo, useState } from "react";
import UserTable from "./UserTable";
import UserCardList from "./UserCardList";
import TableToolbar from "@/components/shared/TableToolbar";
import { Toolbar } from "@/types/Toolbar";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const toolbar = useMemo<Toolbar>(
    () => ({
      items: [],
      searchInput: {
        active: true,
        placeholder: "Search users...",
        value: search,
        onChange: setSearch,
      },
    }),
    [search, setSearch]
  );

  useEffect(() => {
    const getAllUsers = async () => {
      const { message, data } = await http.get<ApiResponse<User[]>>(
        "/owner/users",
        ApiType.FRONTEND
      );
      if (message !== RequestStatus.SUCCESS) return;

      setUsers(data || []);
    };

    getAllUsers();
  }, []);

  const handleAction = async (id: number, action: OwnerActions) => {
    const { message, data } = await http.put<ApiResponse<User>>(
      `/owner/users/${id}/${action}`,
      ApiType.FRONTEND
    );
    if (message !== RequestStatus.SUCCESS) return;

    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === id ? data! : user))
    );
  };

  return (
    <div className='w-full '>
      <h2 className='text-xl font-semibold text-theme-inputbg mt-4 mb-4'>
        Users
      </h2>

      {/* TABLE BOX (toolbar + table inside) */}
      <div className='bg-theme-bodybg rounded-sm border border-theme-bodycolor overflow-hidden shadow'>
        {/* TOOLBAR sitting as the table header */}
        <TableToolbar toolbar={toolbar} search={search} setSearch={setSearch} />

        {/* Desktop */}
        <UserTable users={filteredUsers} onAction={handleAction} />

        {/* Mobile */}
        <UserCardList users={filteredUsers} onAction={handleAction} />
      </div>
    </div>
  );
}
