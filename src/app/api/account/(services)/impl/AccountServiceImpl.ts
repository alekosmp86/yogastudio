import { PrismaClient } from "@prisma/client";
import { AccountService } from "../AccountService";
import { Account } from "@prisma/client";

export class AccountServiceImpl implements AccountService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: Omit<Account, "id">): Promise<Account> {
    return this.prisma.account.create({ data });
  }

  async upsert(data: Omit<Account, "id">): Promise<Account> {
    return this.prisma.account.upsert({
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
