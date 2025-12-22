import { SessionUser } from "@/types/SessionUser";
import Button from "../shared/Button";

type ProfileCompletionFormProps = {
  isOpen: boolean;
  userData: SessionUser | null;
  onSubmit: (data: { name: string; phone: string }) => void;
};

export function ProfileCompletionForm({ isOpen, onSubmit, userData }: ProfileCompletionFormProps) {
  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    onSubmit({
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-md bg-theme-headings p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-theme-text">
          Complete your profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-theme-text">
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
            <label className="block text-sm font-medium text-theme-text">
              Phone
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
