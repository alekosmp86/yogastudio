import { PrismaClient } from "@prisma/client";
import { MagicLinkServiceImpl } from "./magic-link/(services)/impl/MagicLinkServiceImpl";
import { UserLinkServiceImpl } from "../user-link/(services)/impl/UserLinkService";

const prisma = new PrismaClient();

export const magicLinkService = new MagicLinkServiceImpl(prisma, new UserLinkServiceImpl(prisma));