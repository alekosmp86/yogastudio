import { prisma } from "@/lib/prisma";
import { TestimonialService } from "../TestimonialService";
import { TestimonialData } from "@/types/testimonials/TestimonialData";

export class TestimonialServiceImpl implements TestimonialService {
  async createTestimonial(
    testimonialData: TestimonialData,
    userId: number
  ): Promise<void> {
    await prisma.testimonials.upsert({
      where: {
        userId: userId,
      },
      update: {
        message: testimonialData.message,
        rate: testimonialData.rating,
      },
      create: {
        message: testimonialData.message,
        rate: testimonialData.rating,
        userId,
      },
    });
  }

  async getTestimonial(userId: number): Promise<TestimonialData | null> {
    const testimonial = await prisma.testimonials.findUnique({
      where: {
        userId: userId,
      },
    });
    if (!testimonial) {
      return null;
    }
    return {
      rating: testimonial.rate,
      message: testimonial.message,
    };
  }
}
