import { useSearchParams, useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { http } from "@/lib/http";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { ApiType } from "@/enums/ApiTypes";
import { RequestStatus } from "@/enums/RequestStatus";
import Input from "../shared/Input";
import Button from "../shared/Button";

export default function RegisterForm() {
  const params = useSearchParams();
  const email = params.get("email") || "";
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState({ name: "", email: email, phone: "" });
  const [registerStatus, setRegisterStatus] = useState({
    status: RequestStatus.IDLE,
    message: "",
  });

  // Countdown state
  const [countdown, setCountdown] = useState(5);

  // When success → start countdown + redirect
  useEffect(() => {
    if (registerStatus.status !== RequestStatus.SUCCESS) return;

    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c === 1) {
          clearInterval(interval);
          router.replace("/");
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [registerStatus.status, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    router.replace("/");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await http.post<ApiResponse<void>>(
      `/auth/register`,
      ApiType.FRONTEND,
      form
    );

    if (response.message === RequestStatus.SUCCESS) {
      setRegisterStatus({
        status: RequestStatus.SUCCESS,
        message: "User registered successfully",
      });
      formRef.current?.reset();
    } else {
      setRegisterStatus({
        status: RequestStatus.ERROR,
        message: "Error registering user. Please try again later.",
      });
    }
  };

  const showForm = registerStatus.status !== RequestStatus.SUCCESS;

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-6 bg-theme-bg-3'>
      <div className='w-full max-w-md mx-auto mt-10 p-6 rounded-2xl shadow-lg bg-white text-primary-900 border border-gray-200'>
        {/* FORM (hidden when success) */}
        {showForm && (
          <>
            <h2 className='text-2xl font-semibold text-gray-800 mb-6 text-center'>
              Create Your Account
            </h2>
            <form onSubmit={handleSubmit} className='space-y-4' ref={formRef}>
              {/* Name */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Name
                </label>
                <Input
                  type='text'
                  name='name'
                  value={form.name}
                  onChange={handleChange}
                  className='w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none'
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Email
                </label>
                <Input
                  type='email'
                  name='email'
                  disabled={true}
                  value={form.email}
                  onChange={handleChange}
                  autoComplete='email'
                  className='w-full p-3 rounded-lg border border-gray-300 text-primary-900/50 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none'
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Phone
                </label>
                <div className='flex items-center'>
                  <span className='text-primary-900/50 mr-2'>+598</span>
                  <Input
                    type='tel'
                    name='phone'
                    value={form.phone}
                    onChange={handleChange}
                    className='w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none'
                    required
                  />
                </div>
              </div>

              <div className='flex justify-end gap-2'>
                <Button
                  type='button'
                  onClick={handleCancel}
                  variant='secondary'
                  className='text-white'
                >
                  Cancel
                </Button>

                <Button type='submit' variant='primary' className='text-white'>
                  Register
                </Button>
              </div>
            </form>
          </>
        )}

        {/* STATUS MESSAGES */}
        <div className='flex justify-center'>
          {registerStatus.status === RequestStatus.SUCCESS && (
            <div className='text-success-800 text-center'>
              <p className='font-medium'>{registerStatus.message}!</p>
              <p className='text-sm mt-1'>
                Redirecting to login page in{" "}
                <span className='font-semibold'>{countdown}</span> seconds...
              </p>
            </div>
          )}

          {registerStatus.status === RequestStatus.ERROR && (
            <p className='text-danger-600 mt-4 text-center'>
              {registerStatus.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
