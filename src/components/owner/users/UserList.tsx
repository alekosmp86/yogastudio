import { ApiType } from "@/enums/ApiTypes";
import { RequestStatus } from "@/enums/RequestStatus";
import { http } from "@/lib/http";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { User } from "@/types/users/User";
import { useCallback, useEffect, useMemo, useState } from "react";
import UserTable from "./UserTable";
import UserCardList from "./UserCardList";
import TableToolbar from "@/components/shared/TableToolbar";
import { Toolbar } from "@/types/Toolbar";
import { useToast } from "@/lib/contexts/ToastContext";
import { ToastType } from "@/enums/ToastType";
import Container from "@/components/shared/Container";
import { useTranslation } from "react-i18next";
import { UserActions } from "@/enums/UserActions";
import { Loader } from "lucide-react";

export default function UserList() {
  const { t } = useTranslation();
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { showToast, hideToast } = useToast();

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const searchCallback = useCallback(
    () => ({
      items: [],
      searchInput: {
        active: true,
        placeholder: t("searchUsers"),
        value: search,
        onChange: setSearch,
      },
    }),
    [search, t]
  );

  const toolbar = useMemo<Toolbar>(() => searchCallback(), [searchCallback]);

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
      message: t("executingAction"),
      type: ToastType.WARNING,
    });

    try {
      switch (action) {
        case UserActions.APPROVE_USER:
        case UserActions.BLOCK_USER: {
          const { message, data } = await http.put<ApiResponse<User>>(
            `/owner/users/${id}/${action}`,
            ApiType.FRONTEND
          );
          if (message !== RequestStatus.SUCCESS) {
            showToast({
              message: t("failedToUpdateUser"),
              type: ToastType.ERROR,
            });
            return;
          }

          setUsers((prevUsers) =>
            prevUsers.map((user) => (user.id === id ? data! : user))
          );
          showToast({
            message: t("userUpdatedSuccessfully"),
            type: ToastType.SUCCESS,
          });
          break;
        }
      }
    } catch {
      showToast({
        message: t("failedToExecuteAction"),
        type: ToastType.ERROR,
      });
    } finally {
      hideToast(toastId);
    }
  };

  return (
    <Container>
      <section className='mt-6 space-y-6'>
        {/* HEADER */}
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-semibold text-white'>{t("users")}</h2>
        </div>

        {/* TABLE BOX (toolbar + table inside) */}
        {users.length > 0 ? (
          <div className='rounded-3xl bg-custom-50 shadow-sm'>
            {/* TOOLBAR sitting as the table header */}
            <TableToolbar
              toolbar={toolbar}
              search={search}
              setSearch={setSearch}
            />

            {/* Desktop */}
            <div className='hidden md:block p-4 min-h-[calc(100vh-400px)]'>
              <UserTable users={filteredUsers} onAction={handleAction} />
            </div>

            {/* Mobile */}
            <UserCardList users={filteredUsers} onAction={handleAction} />
          </div>
        ) : (
          <h1 className='flex flex-row pl-2 text-left py-2 text-white'>
            {loading ? (
              <>
                <Loader className='mr-2 h-6 w-6 animate-spin' /> {t("loading")}
              </>
            ) : (
              t("noUsersFound")
            )}
          </h1>
        )}
      </section>
    </Container>
  );
}
