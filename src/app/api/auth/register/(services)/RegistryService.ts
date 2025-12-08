import { User } from "@prisma/client";

export interface RegistryService {
    register(name: string, email: string, phone: string): Promise<User>;
}