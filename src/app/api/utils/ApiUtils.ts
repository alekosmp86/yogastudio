import { RequestStatus } from "@/enums/RequestStatus";
import { SessionUser } from "@/types/SessionUser";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export class ApiUtils {
  static async getSessionUser() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    if (!session) {
      throw new Error(RequestStatus.UNAUTHORIZED);
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload }: { payload: { user: SessionUser } } = await jwtVerify(
      session,
      secret
    );
    return payload.user;
  }
}
