"use client";

import TestimonialCard from "./TestimonialCard";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "María González",
      text: "The classes completely changed my mornings. I feel stronger, calmer, and more focused every day.",
    },
    {
      id: 2,
      name: "Laura Pereira",
      text: "Booking classes through the app is so easy. The studio atmosphere is amazing!",
    },
    {
      id: 3,
      name: "Ana Martínez",
      text: "I love the instructors and the schedule flexibility. Best yoga studio I've ever been to.",
    },
  ];

  return (
    <section className="mt-10 space-y-6">
      <h2 className="text-xl font-bold text-gray-800 text-center">
        What our students say
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((t) => (
          <TestimonialCard key={t.id} name={t.name} text={t.text} />
        ))}
      </div>
    </section>
  );
}
