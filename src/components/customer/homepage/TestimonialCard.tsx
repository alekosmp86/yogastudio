import { cn } from "@/lib/utils/utils";
import { TestimonialHomePage } from "@/types/testimonials/TestimonialHomePage";
import { Quote, Star } from "lucide-react";

export default function TestimonialCard({
  testimonial,
}: {
  testimonial: TestimonialHomePage;
}) {
  return (
    <div className="group relative flex flex-col gap-4 rounded-xl border border-primary-900/10 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {/* Quote icon */}
      <Quote className="h-6 w-6 text-primary-400" />

      {/* Testimonial text */}
      <p className="text-sm leading-relaxed text-gray-700">
        “{testimonial.message}”
      </p>

      <span className="flex flex-row">
        {[1, 2, 3, 4, 5].map((value) => (
          <span key={value} className="focus:outline-none">
            <Star className={cn("h-7 w-7", testimonial.rating >= value ? "fill-warning-500" : "fill-primary-800")} />
          </span>
        ))}
      </span>

      {/* Author */}
      <span className="mt-auto text-sm font-medium text-primary-800">
        {testimonial.userName}
      </span>

      {/* Subtle accent */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1 rounded-b-xl bg-primary-500/20" />
    </div>
  );
}
