import { RequestStatus } from "@/enums/RequestStatus";

export interface CreateClassResponse {
  message: RequestStatus;
  id: number;
}