import { SessionUser } from "@/types/SessionUser";
import Button from "../shared/Button";
import { useToast } from "@/lib/contexts/ToastContext";
import { ToastType } from "@/enums/ToastType";
import { useTranslation } from "react-i18next";

type ProfileCompletionFormProps = {
  isOpen: boolean;
  userData: SessionUser | null;
  onSubmit: (data: { name: string; phone: string }) => void;
};

export function ProfileCompletionForm({
  isOpen,
  onSubmit,
  userData,
}: ProfileCompletionFormProps) {
  const { t } = useTranslation();
  const toast = useToast();

  if (!isOpen) return null;

  function validatePhoneNumber(phone: string) {
    const phoneRegex = /^\+?[1-9]\d{1,8}$/;
    if (!phoneRegex.test(phone)) {
      toast.showToast({
        message: "Invalid phone number",
        type: ToastType.ERROR,
        duration: 3000,
      });
      return false;
    }
    return true;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;

    if (!name || !phone) return;

    if (!validatePhoneNumber(phone)) return;

    onSubmit({ name, phone });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" aria-hidden />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
      >
        <h2 className="mb-1 text-xl font-semibold text-primary-800">
          {t("completeYourProfile")}
        </h2>

        <p className="mb-4 text-sm text-primary-600">
          {t("needInformationToManageReservations")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field
            label={t("name")}
            name="name"
            defaultValue={userData?.name}
            required
          />

          <Field
            label={t("phone")}
            name="phone"
            type="tel"
            placeholder="e.g. 94154879"
            defaultValue={userData?.phone}
            required
          />

          <div className="flex justify-end pt-4">
            <Button type="submit" variant="primary">
              {t("saveProfile")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-primary-700">
        {label}
      </label>
      <input
        {...props}
        className="mt-1 w-full rounded-md border border-primary-200 px-3 py-2 text-primary-800
                   focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
      />
    </div>
  );
}
