"use client";

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen px-6 py-10">
      <h1 className="text-3xl font-bold text-[#1A4D6D] mb-6">
        Owner Dashboard
      </h1>
      {children}
    </div>
  );
}