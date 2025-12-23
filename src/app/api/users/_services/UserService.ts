import { User } from "@prisma/client";

export interface UserService {
    create(data: User): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User | null>;
    findUniqueByFields(fields: Pick<User, "email">): Promise<User | null>;
    executeAction(id: number, action: string): Promise<User | null>;
}