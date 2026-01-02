import Button from "@/components/shared/Button";
import { cn } from "@/lib/utils/utils";
import { Check, Info, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { UserActions as UserActionsEnum } from "@/enums/UserActions";

type UserActionsProps = {
  id: number;
  approved: boolean;
  onAction: (id: number, action: UserActionsEnum) => void;
  mobile?: boolean;
};

export default function UserActions({
  id,
  approved,
  onAction,
  mobile = false,
}: UserActionsProps) {
  const { t } = useTranslation();

  return (
    <div className="flex gap-1">
      <Button
        size="sm"
        variant="ghost"
        className="text-custom-300"
        onClick={() => onAction(id, UserActionsEnum.VIEW_USER_DETAILS)}
        Icon={Info}
      >
        {t("details")}
      </Button>
      <Button
        size="sm"
        variant="ghost"
        Icon={approved ? X : Check}
        className={cn(
          mobile ? "flex-1" : "",
          approved ? "text-red-500" : "text-green-500"
        )}
        onClick={() =>
          onAction(
            id,
            approved ? UserActionsEnum.BLOCK_USER : UserActionsEnum.APPROVE_USER
          )
        }
      >
        {approved ? t("block") : t("approve")}
      </Button>
    </div>
  );
}
