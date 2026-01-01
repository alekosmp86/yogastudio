import Button from "@/components/shared/Button";
import { OwnerActions } from "@/enums/OwnerActions";
import { cn } from "@/lib/utils/utils";
import { Check, X } from "lucide-react";

type UserActionsProps = {
  id: number;
  approved: boolean;
  onAction: (id: number, action: OwnerActions) => void;
  mobile?: boolean;
};

export default function UserActions({
  id,
  approved,
  onAction,
  mobile = false,
}: UserActionsProps) {
  return (
    <div>
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
            approved ? OwnerActions.REJECT_USER : OwnerActions.APPROVE_USER
          )
        }
      >
        {approved ? "Reject" : "Approve"}
      </Button>
    </div>
  );
}
