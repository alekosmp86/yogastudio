import { AccountService } from "../AccountService";
import { Account } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export class AccountServiceImpl implements AccountService {

  async create(data: Omit<Account, "id">): Promise<Account> {
    return prisma.account.create({ data });
  }

  async upsert(data: Omit<Account, "id">): Promise<Account> {
    return prisma.account.upsert({
      where: {
        provider_providerAccountId: {
          provider: "google",
          providerAccountId: data.providerAccountId,
        },
      },
      update: {},
      create: {
        provider: "google",
        providerAccountId: data.providerAccountId,
        userId: data.userId,
      },
    });
  }
}
