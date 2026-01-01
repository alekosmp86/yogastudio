import Button from "@/components/shared/Button";
import { Trash, X } from "lucide-react";
import React, { Activity, useEffect } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onRemove: () => void;
  title?: string;
  emptyCell: boolean;
  children: React.ReactNode;
}

export function ClassSelectorModal({
  open,
  onClose,
  onRemove,
  title,
  children,
  emptyCell,
}: ModalProps) {
  const { t } = useTranslation();
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-custom-500/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md max-h-[70vh] flex flex-col rounded-xl bg-custom-300/95 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        {title && (
          <div className="px-6 pt-6 pb-4 border-b border-custom-100">
            <h2 className="text-lg font-semibold text-white text-center">
              {title}
            </h2>
          </div>
        )}

        {/* CONTENT */}
        <div
          className="bg-custom-100 px-6 py-4 overflow-y-auto flex flex-col gap-2 text-custom-400"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {children}
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 flex justify-end items-center border-t border-custom-100">
          <Button
            variant="ghost"
            Icon={X}
            onClick={onClose}
            className="text-white"
          >
            {t("close")}
          </Button>

          <Activity mode={emptyCell ? "hidden" : "visible"}>
            <Button
              variant="ghost"
              Icon={Trash}
              onClick={onRemove}
              className="text-red-400"
            >
              {t("remove")}
            </Button>
          </Activity>
        </div>
      </div>
    </div>,
    document.body
  );
}
