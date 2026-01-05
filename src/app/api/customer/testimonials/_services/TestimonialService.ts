import { TestimonialData } from "@/types/testimonials/TestimonialData";

export interface TestimonialService {
    createTestimonial(testimonialData: TestimonialData, userId: number): Promise<void>;
    getTestimonial(userId: number): Promise<TestimonialData | null>;
}