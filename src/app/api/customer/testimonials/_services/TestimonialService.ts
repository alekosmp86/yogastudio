import { TestimonialData } from "@/types/testimonials/TestimonialData";
import { TestimonialHomePage } from "@/types/testimonials/TestimonialHomePage";

export interface TestimonialService {
    createTestimonial(testimonialData: TestimonialData, userId: number): Promise<void>;
    getTestimonial(userId: number): Promise<TestimonialData | null>;
    getTestimonialsHomePage(): Promise<TestimonialHomePage[] | null>;
}