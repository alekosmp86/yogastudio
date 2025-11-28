import Button from "@/components/shared/Button";
import { Check, X } from "lucide-react";

type UserActionsProps = {
  id: number;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  mobile?: boolean;
};

export default function UserActions({id, onApprove, onReject, mobile = false}: UserActionsProps) {
  const base = "px-3 py-1.5 text-sm rounded-lg text-white";
  const full = mobile ? "flex-1" : "";

  return (
    <div className="flex gap-2">
      <Button size="sm" 
        variant="primary" 
        Icon={Check}
        className={`${base} ${full}`} 
        onClick={() => onApprove(id)}>
        Approve
      </Button>
      <Button size="sm" 
        variant="negative" 
        Icon={X}
        className={`${base} ${full}`} 
        onClick={() => onReject(id)}>
        Reject
      </Button>
    </div>
  );
}
