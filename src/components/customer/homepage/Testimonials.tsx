"use client";

import { useEffect, useState } from "react";
import TestimonialCard from "./TestimonialCard";
import { useTranslation } from "react-i18next";
import { TestimonialHomePage } from "@/types/testimonials/TestimonialHomePage";
import { http } from "@/lib/http";
import { RequestStatus } from "@/enums/RequestStatus";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { ApiType } from "@/enums/ApiTypes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/utils";

export default function Testimonials() {
  const { t } = useTranslation();
  const [testimonials, setTestimonials] = useState<TestimonialHomePage[]>([]);
  const [page, setPage] = useState(0);

  const PAGE_SIZE = 3;

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { message, data } = await http.get<
        ApiResponse<TestimonialHomePage[]>
      >("/customer/testimonials/homepage", ApiType.FRONTEND);

      if (message === RequestStatus.SUCCESS && data) {
        setTestimonials(data);
        setPage(0); // reset page on new data
      }
    };

    fetchTestimonials();
  }, []);

  const totalPages = Math.ceil(testimonials.length / PAGE_SIZE);

  const visibleTestimonials = testimonials.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE
  );

  const canGoPrev = page > 0;
  const canGoNext = page < totalPages - 1;

  const goPrev = () => {
    if (canGoPrev) {
      setPage((prev) => prev - 1);
    }
  };

  const goNext = () => {
    if (canGoNext) {
      setPage((prev) => prev + 1);
    }
  };

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

      {/* Carousel */}
      <div className="w-full grid grid-cols-[auto_1fr_auto] items-center gap-4">
        {/* Left */}
        <ChevronLeft
          onClick={goPrev}
          className={cn(
            "h-7 w-7 transition",
            canGoPrev
              ? "text-primary-800 cursor-pointer hover:text-primary-600"
              : "text-gray-300 cursor-not-allowed"
          )}
        />

        {/* Content */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Right */}
        <ChevronRight
          onClick={goNext}
          className={cn(
            "h-7 w-7 transition",
            canGoNext
              ? "text-primary-800 cursor-pointer hover:text-primary-600"
              : "text-gray-300 cursor-not-allowed"
          )}
        />
      </div>

      {testimonials.length === 0 && (
        <p className="text-center text-primary-800">{t("noTestimonials")}</p>
      )}
    </section>
  );
}
