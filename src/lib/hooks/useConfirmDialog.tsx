import { ConfirmationDialog } from "@/components/shared/ConfirmationDialog";
import { useCallback, useRef, useState } from "react";

type ConfirmOptions = {
  title: string;
  description: string;
  danger?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
};

export function useConfirmDialog() {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const resolverRef = useRef<(value: boolean) => void>(null);

  const confirm = useCallback((opts: ConfirmOptions): Promise<boolean> => {
    setOptions(opts);

    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
    });
  }, []);

  const handleConfirm = () => {
    resolverRef.current?.(true);
    setOptions(null);
  };

  const handleCancel = () => {
    resolverRef.current?.(false);
    setOptions(null);
  };

  const dialog = options ? (
    <span className="min-w-[320px] max-w-md">
      <ConfirmationDialog
        open={true}
        title={options.title}
        description={options.description}
        danger={options.danger}
        confirmLabel={options.confirmLabel}
        cancelLabel={options.cancelLabel}
        onConfirm={handleConfirm}
        onClose={handleCancel}
      />
    </span>
  ) : null;

  return { confirm, dialog };
}
