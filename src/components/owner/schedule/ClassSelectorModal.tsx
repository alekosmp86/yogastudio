import React, { useEffect } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onRemove: () => void;
  title?: string;
  children: React.ReactNode;
}

export function ClassSelectorModal({open, onClose, onRemove, title, children}: ModalProps) {
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
    <div className='fixed inset-0 bg-black/45 flex items-center justify-center z-50 p-4' onClick={onClose}>
      <div
        className='bg-surface-app text-textcolor-primary rounded-xl shadow-elevated w-full max-w-md max-h-[50vh] flex flex-col'
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2 className='text-lg font-semibold text-textcolor-ondark px-6 pt-5 pb-3'>
            {title}
          </h2>
        )}

        <div
          className='px-6 text-textcolor-secondary overflow-y-auto max-h-[40vh] flex flex-col gap-2'
          style={{ WebkitOverflowScrolling: "touch" }} // smooth iOS scrolling
        >
          {children}
        </div>

        <div className='px-6 py-4 mt-2 flex flex-row gap-2'>
          <button
            className='bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover transition w-full'
            onClick={onClose}
          >Close</button>
          <button
            className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition w-full'
            onClick={onRemove}
          >Remove class</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
