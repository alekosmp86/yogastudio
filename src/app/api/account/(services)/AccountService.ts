import {Account} from "@prisma/client";

export interface AccountService {
    create(data: Omit<Account, "id">): Promise<Account>;
    upsert(data: Omit<Account, "id">): Promise<Account>;
}