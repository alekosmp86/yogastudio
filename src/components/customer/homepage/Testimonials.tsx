"use client";

import TestimonialCard from "./TestimonialCard";
import { useTranslation } from "react-i18next";

export default function Testimonials() {
  const { t } = useTranslation();

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
    <section className="mt-14 space-y-6">
      {/* Section header */}
      <div className="text-center space-y-1">
        <h2 className="text-xl font-semibold text-primary-800">
          {t("whatOurStudentsSay")}
        </h2>
        <p className="text-sm text-gray-500">
          {t("realExperiencesFromOurCommunity")}
        </p>
      </div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            name={testimonial.name}
            text={testimonial.text}
          />
        ))}
      </div>
    </section>
  );
}
