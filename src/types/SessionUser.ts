import { UserPenalty } from "@prisma/client";

export type SessionUser = {
  id: number;
  email: string;
  role: string;
  name: string;
  phone: string;
  approved: boolean;
  penalties?: UserPenalty;
};