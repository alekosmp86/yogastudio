import { SessionUser } from "@/types/SessionUser";
import Button from "../shared/Button";
import { useToast } from "@/lib/contexts/ToastContext";
import { ToastType } from "@/enums/ToastType";

type ProfileCompletionFormProps = {
  isOpen: boolean;
  userData: SessionUser | null;
  onSubmit: (data: { name: string; phone: string }) => void;
};

export function ProfileCompletionForm({ isOpen, onSubmit, userData }: ProfileCompletionFormProps) {
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
      <div
        className="absolute inset-0 bg-black/50"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-md bg-theme-headings p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-white">
          Complete your profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white">
              Name
            </label>
            <input
              name="name"
              defaultValue={userData?.name || ""}
              required
              className="mt-1 w-full text-black rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Phone (e.g. 94154879)
            </label>
            <input
              name="phone"
              type="tel"
              required
              className="mt-1 w-full text-black rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="submit"
              variant="primary"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
