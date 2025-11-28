import Button from "@/components/shared/Button";
import { OwnerActions } from "@/enums/OwnerActions";
import { Check, X } from "lucide-react";

type UserActionsProps = {
  id: number;
  approved: boolean;
  onAction: (id: number, action: OwnerActions) => void;
  mobile?: boolean;
};

export default function UserActions({id, approved, onAction, mobile = false}: UserActionsProps) {
  const base = "px-3 py-1.5 text-sm rounded-lg text-white";
  const full = mobile ? "flex-1" : "";

  return (
    <div className="flex gap-2">
      <Button size="sm" 
        variant={approved ? "negative" : "primary"} 
        Icon={approved ? X : Check}
        className={`${base} ${full}`} 
        onClick={() => onAction(id, approved ? OwnerActions.REJECT_USER : OwnerActions.APPROVE_USER)}>
        {approved ? "Reject" : "Approve"}
      </Button>
    </div>
  );
}
