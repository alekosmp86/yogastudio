import { testimonialService } from "app/api";
import { RequestStatus } from "@/enums/RequestStatus";

export async function GET() {
  try {
    const testimonialsHomePage =
      await testimonialService.getTestimonialsHomePage();
    return Response.json(
      { message: RequestStatus.SUCCESS, data: testimonialsHomePage },
      { status: 200 }
    );
  } catch {
    return Response.json(
      { message: RequestStatus.ERROR, data: null },
      { status: 500 }
    );
  }
}
