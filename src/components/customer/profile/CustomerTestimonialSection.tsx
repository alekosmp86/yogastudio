import Button from "@/components/shared/Button";
import { ApiType } from "@/enums/ApiTypes";
import { RequestStatus } from "@/enums/RequestStatus";
import { http } from "@/lib/http";
import { cn } from "@/lib/utils/utils";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TestimonialData } from "@/types/testimonials/TestimonialData";
import { useToast } from "@/lib/contexts/ToastContext";
import { ToastType } from "@/enums/ToastType";

export default function CustomerTestimonialSection() {
  const { t } = useTranslation();
  const {showToast} = useToast();
  const [testimonial, setTestimonial] = useState<TestimonialData | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const fetchTestimonial = async () => {
      const {message, data} = await http.get<ApiResponse<TestimonialData>>("/customer/testimonials", ApiType.FRONTEND);

      if(message === RequestStatus.SUCCESS && data) {
        setTestimonial(data);
      }
    };
    fetchTestimonial();
  }, []);

  const onSubmit = async (data: TestimonialData) => {
    if(data.rating === 0 || !data.message) {
      showToast({
        type: ToastType.WARNING,
        message: t("testimonialSectionWarningDescription"),
        duration: 3000,
      });
      return;
    }

    const {message} = await http.post<ApiResponse<void>>("/customer/testimonials", ApiType.FRONTEND, data);

    if(message === RequestStatus.SUCCESS) {
      showToast({
        type: ToastType.SUCCESS,
        message: t("testimonialSectionSuccessDescription"),
        duration: 3000,
      });
    } else {
      showToast({
        type: ToastType.ERROR,
        message: t("testimonialSectionErrorDescription"),
        duration: 3000,
      });
    }
  };

  const setRating = (rating: number) => {
    setTestimonial(prev => {
      if(!prev) {
        return {
          rating,
          message: "",
        };
      }
      return {
        ...prev,
        rating,
      };
    })
  };

  const setMessage = (message: string) => {
    setTestimonial(prev => {
      if(!prev) {
        return {
          rating: 0,
          message,
        };
      }
      return {
        ...prev,
        message,
      };
    })
  };

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm flex flex-col gap-4">
      {/* Title */}
      <h2 className="text-lg font-semibold text-primary-800 text-center">
        {t("testimonialSectionTitle")}
      </h2>

      {/* Stars */}
      <div className="flex justify-center gap-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setRating(value)}
            onMouseEnter={() => setHovered(value)}
            onMouseLeave={() => setHovered(null)}
            className="focus:outline-none"
          >
            <Star
              className={cn(
                "h-7 w-7 transition-colors",
                (hovered ?? testimonial?.rating ?? 0) >= value
                  ? "fill-primary-500 text-primary-500"
                  : "text-primary-300"
              )}
            />
          </button>
        ))}
      </div>

      {/* Helper text */}
      <p className="text-xs text-center text-primary-600">
        {t("testimonialSectionHelperText")}
      </p>

      {/* Text input */}
      <textarea
        value={testimonial?.message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={t("testimonialSectionPlaceholder")}
        rows={4}
        className="w-full rounded-xl border border-primary-900/30 px-3 py-2 text-sm text-primary-900 
                  focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none bg-white"
      />

      {/* Action */}
      <div className="flex justify-end">
        <Button
          size="sm"
          variant="primary"
          onClick={() => onSubmit({ rating: testimonial?.rating ?? 0, message: testimonial?.message ?? "" })}
          className="rounded-xl px-6"
        >
          {t("testimonialSectionButton")}
        </Button>
      </div>
    </section>
  );
}
