import { prisma } from "@/lib/prisma";
import { TestimonialService } from "../TestimonialService";
import { TestimonialData } from "@/types/testimonials/TestimonialData";
import { TestimonialHomePage } from "@/types/testimonials/TestimonialHomePage";

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

  async getTestimonialsHomePage(): Promise<TestimonialHomePage[] | null> {
    const testimonialsHomePage = await prisma.testimonials.findMany({
      select: {
        id: true,
        user: {
          select: {
            name: true,
          },
        },
        message: true,
        rate: true,
      },
      orderBy: {
        rate: "desc",
      },
      take: 10,
    });
    if (!testimonialsHomePage) {
      return null;
    }
    return testimonialsHomePage.map((testimonial) => ({
      id: testimonial.id,
      userName: testimonial.user.name,
      message: testimonial.message,
      rating: testimonial.rate,
    }));
  }
}
