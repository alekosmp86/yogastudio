import { Quote } from "lucide-react";

export default function TestimonialCard({ name, text }: { name: string; text: string }) {
  return (
    <div className="p-5 border rounded-lg bg-white shadow-lg hover:shadow-md transition flex flex-col gap-3">
      <Quote className="h-6 w-6 text-blue-600" />
      <p className="text-gray-700 text-sm">{text}</p>
      <span className="text-gray-900 font-semibold text-sm mt-auto">
        — {name}
      </span>
    </div>
  );
}