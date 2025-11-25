import { RequestStatus } from "@/enums/RequestStatus";

export interface ApiResponse<T> {
  message: RequestStatus;
  data?: T;
}
