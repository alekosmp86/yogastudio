import { testimonialService } from "app/api";
import { RequestStatus } from "@/enums/RequestStatus";
import { ApiUtils } from "app/api/utils/ApiUtils";
import { TestimonialData } from "@/types/testimonials/TestimonialData";

export async function GET() {
  const user = await ApiUtils.getSessionUser();
  if (!user) {
    return new Response(
      JSON.stringify({ message: RequestStatus.UNAUTHORIZED }),
      { status: 401 }
    );
  }
  try {
    const testimonial = await testimonialService.getTestimonial(user.id);
    return new Response(
      JSON.stringify({ message: RequestStatus.SUCCESS, data: testimonial }),
      { status: 200 }
    );
  } catch {
    return new Response(JSON.stringify({ message: RequestStatus.ERROR }), {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  const testimonialData: TestimonialData = await request.json();
  try {
    const user = await ApiUtils.getSessionUser();
    if (!user) {
      return new Response(
        JSON.stringify({ message: RequestStatus.UNAUTHORIZED }),
        { status: 401 }
      );
    }
    await testimonialService.createTestimonial(testimonialData, user.id);
    return new Response(JSON.stringify({ message: RequestStatus.SUCCESS }), {
      status: 200,
    });
  } catch {
    return new Response(JSON.stringify({ message: RequestStatus.ERROR }), {
      status: 500,
    });
  }
}
