import { ApiType } from "@/enums/ApiTypes";
import { RequestStatus } from "@/enums/RequestStatus";
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
import { useTranslation } from "react-i18next";
import { UserActions } from "@/enums/UserActions";

export default function UserList() {
  const {t} = useTranslation();
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

  const handleAction = async (id: number, action: UserActions) => {
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
      <section className="mt-6 space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">{t("users")}</h2>
        </div>

        {/* TABLE BOX (toolbar + table inside) */}
        <div className="rounded-3xl bg-custom-50 shadow-sm">
          {/* TOOLBAR sitting as the table header */}
          <TableToolbar
            toolbar={toolbar}
            search={search}
            setSearch={setSearch}
          />

          {/* Desktop */}
          <div className="hidden md:block p-4 min-h-[calc(100vh-400px)]">
            <UserTable users={filteredUsers} onAction={handleAction} />
          </div>

          {/* Mobile */}
          <UserCardList users={filteredUsers} onAction={handleAction} />
          {users.length === 0 && (
            <h1 className="pl-2 text-left bg-white py-2 text-primary-900">
              {loading ? "Loading..." : "No users found"}
            </h1>
          )}
        </div>
      </section>
    </Container>
  );
}
