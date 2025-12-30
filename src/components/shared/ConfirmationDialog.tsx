import { useEffect, useRef } from "react";
import Button from "./Button";

type ConfirmationDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export function ConfirmationDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  danger = false,
  onConfirm,
  onClose,
}: ConfirmationDialogProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md p-0 backdrop:bg-black/40"
    >
      <div className="w-full max-w-md bg-white p-6">
        <h2
          className={`text-lg font-bold mb-2 ${
            danger ? "text-red-600" : "text-primary-800"
          }`}
        >
          {title}
        </h2>

        <p className="text-gray-700 mb-6">{description}</p>

        <div className="flex justify-end gap-3">
          <Button type="button" onClick={onClose} variant="secondary">
            {cancelLabel}
          </Button>

          <Button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            variant={danger ? "negative" : "primary"}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  );
}
