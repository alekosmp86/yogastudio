"use client";

import Button from "../shared/Button";

export default function UserApprovalPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-6 bg-theme-headings text-white'>
      <div className='flex flex-col gap-4 w-full max-w-xs bg-theme-cardbg p-6 rounded-lg shadow-xl border border-brand-600'>
        <h1 className='text-xl font-semibold text-center text-primary-800'>
          Approval
        </h1>
        <p className='text-center text-primary-800'>
          Your account is pending approval. Please contact the admin.
        </p>

        <Button
          type='button'
          onClick={() => (window.location.href = "/login")}
          variant='primary'
        >
          Back to login
        </Button>
      </div>
    </div>
  );
}
