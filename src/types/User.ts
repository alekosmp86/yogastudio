import { Roles } from "@/enums/Roles";

export type User = {
    id: number,
    name: string,
    email: string,
    role: Roles,
    approved: boolean,
    emailVerified: boolean,
    phone?: string | null
};