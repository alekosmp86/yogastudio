import { User } from "@prisma/client";

export interface UserService {
    getUserById(id: number): Promise<User | null>;
    findUniqueByFields(fields: Pick<User, "email">): Promise<User | null>;
}