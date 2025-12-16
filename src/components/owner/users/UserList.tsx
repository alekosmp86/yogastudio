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
import { useToast } from "@/lib/contexts/ToastContext";
import { ToastType } from "@/enums/ToastType";
import Container from "@/components/shared/Container";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast, hideToast } = useToast();

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
      setLoading(true);
      const { message, data } = await http.get<ApiResponse<User[]>>(
        "/owner/users",
        ApiType.FRONTEND
      );
      if (message !== RequestStatus.SUCCESS) return;

      setUsers(data || []);
      setLoading(false);
    };

    getAllUsers();
  }, []);

  const handleAction = async (id: number, action: OwnerActions) => {
    const toastId = showToast({
      message: "Updating user...",
      type: ToastType.WARNING,
    });

    try {
      const { message, data } = await http.put<ApiResponse<User>>(
        `/owner/users/${id}/${action}`,
        ApiType.FRONTEND
      );
      if (message !== RequestStatus.SUCCESS) {
        showToast({
          message: "Failed to update user",
          type: ToastType.ERROR,
        });
        return;
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? data! : user))
      );
      showToast({
        message: "User updated successfully",
        type: ToastType.SUCCESS,
      });
    } catch {
      showToast({
        message: "Failed to update user",
        type: ToastType.ERROR,
      });
    } finally {
      hideToast(toastId);
    }
  };

  return (
    <Container>
      <div className='w-full mt-6'>
        <h2 className='text-xl font-semibold text-white mt-4 mb-4 rounded-md'>Users</h2>

        {/* TABLE BOX (toolbar + table inside) */}
        <div className='bg-transparent rounded-sm border border-white/50 overflow-hidden shadow'>
          {/* TOOLBAR sitting as the table header */}
          <TableToolbar toolbar={toolbar} search={search} setSearch={setSearch} />

          {/* Desktop */}
          <UserTable users={filteredUsers} onAction={handleAction} />

          {/* Mobile */}
          <UserCardList users={filteredUsers} onAction={handleAction} />
          {users.length === 0 && (
            <h1 className='pl-2 text-left bg-white py-2 text-primary-900'>
              {loading ? "Loading..." : "No users found"}
            </h1>
          )}
        </div>
      </div>
    </Container>
  );
}
