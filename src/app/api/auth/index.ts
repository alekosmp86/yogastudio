import { PrismaClient } from "@prisma/client";
import { MagicLinkServiceImpl } from "./magic-link/(services)/impl/MagicLinkServiceImpl";
import { ResendMailServiceImpl } from "../mailer/services/impl/ResendMailServiceImpl";
import { UserLinkServiceImpl } from "../user-link/(services)/impl/UserLinkService";

const prisma = new PrismaClient();

export const magicLinkService = new MagicLinkServiceImpl(prisma, new UserLinkServiceImpl(prisma));
export const mailService = new ResendMailServiceImpl();